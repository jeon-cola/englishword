import { upload } from "./storage"
import pool from "./pool"
import {Router, Request, Response} from "express"

const router = Router()

router.post("/test", async (req : Request, res : Response) => {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()

        const [testResult]: any = await conn.query(`
            INSERT INTO test () VALUES ()
            `)
        const testId = testResult.insertId

        const parts = [1, 2, 3, 4, 5]
        for (const partNo of parts) {
            await conn.query(`
                INSERT INTO test_part (test_id, part_no) VALUES (?, ?)
                `,[testId, partNo])
        }

        await conn.commit()

        return res.status(201).json({message: "success", testId})
    } catch (error) {
        console.log(error)
        await conn.rollback()
        return res.status(500).json({message: error})
    } finally {
        conn.release()
    }
})

router.post("/part", upload.any(), async (req: Request, res: Response) => {
    const testId = Number(req.body.testId)
    const parts = JSON.parse(req.body.parts)
    const files = req.files as Express.Multer.File[]

    const conn = await pool.getConnection()

    try {
        await conn.beginTransaction()

        for (const part of parts) {
            const [rows]: any = await conn.query(`
                SELECT part_id FROM test_part
                WHERE test_id = ? AND part_no = ?
                `,[testId, part.part_no])
            
            if (!rows.length) throw new Error(`part not fount: partNo=${part.part_no}`)
            
            const partId = rows[0].part_id
            if (part.contents?.length) {
                for (const c of part.contents) {
                    let contentValue: string | null = c.content ?? null

                    if (c.type === "IMAGE") {
                        const file = files.find(f => f.fieldname === c.content)
                        if (!file) throw new Error(`image file missing: ${c.content}`)
                        contentValue = `http://localhost:8080/uploads/${file.filename}`
                    }
                    await conn.query(`
                        INSERT INTO test_part_content (part_id, content_type, content, content_order)
                        VALUES (?, ?, ?, ?)
                    `, [partId, c.type, contentValue, c.order])
                }
            }

            if (part.questions?.length) {
                for (const q of part.questions) {
                    await conn.query(`
                        INSERT INTO test_part_question (part_id, question_text, question_order)
                        VALUES (?, ?, ?)
                    `, [partId, q.text, q.order])
                }
            }

        }

        await conn.commit()

        return res.status(201).json({message: "success", parts})
    } catch (error) {
        console.log(error)
        await conn.rollback()
        return res.status(500).json({message: error})
    } finally {
        conn.release()
    }
})

router.get("/reach_test", async (req: Request, res: Response) => {
    const userId = req.query.userId
    const conn = await pool.getConnection()

    try {
        await conn.beginTransaction()
        const result = []
        const [testIds]: any =  await conn.query(`
            SELECT test_id FROM test
        `)
        for (const test of testIds) {
            const testId = test.test_id
            
                await conn.query(`
                    INSERT INTO user_test_part_progress (user_id, test_id, part_id, status)
                    SELECT ?, ?, p.part_id, "NOT_STARTED"
                    FROM test_part p
                    WHERE p.test_id = ?
                        AND NOT EXISTS (
                            SELECT 1
                            FROM user_test_part_progress utpp
                            WHERE utpp.user_id = ?
                                AND utpp.test_id = ?
                                AND utpp.part_id = p.part_id
                        )    
                `, [userId, testId, testId, userId, testId])
    
                const [parts]: any = await conn.query(`
                    SELECT
                        p.part_id,
                        p.part_no,
                        utpp.status,
                        utpp.completed_at
                    FROM test_part p
                    JOIN user_test_part_progress utpp
                    ON utpp.part_id = p.part_id
                    AND utpp.user_id = ?
                    AND utpp.test_id = ?
                    WHERE p.test_id = ?
                    ORDER BY p.part_no
                    `, [userId, testId, testId])

                result.push({ test_id: testId, parts })
            }

            await conn.commit()

            return res.status(201).json({message: "success", data: result})
        } catch (error) {
            console.log(error)
            await conn.rollback()
            return res.status(500).json({message: error})
    } finally {
        conn.release()
    }

})

router.get("/content_list", async (req: Request, res: Response) => {
    const testId = req.query.testId
    const userId = req.query.userId
    const part = req.query.part
    const conn = await pool.getConnection()

    try {
        const [partRows]: any = await conn.query(`
            SELECT part_id FROM test_part WHERE test_id = ? AND part_no = ?      
        `, [testId, part])

        if (!partRows.length) return res.status(201).json({message: "part not found"})
        
        const partId = partRows[0].part_id

        const [contents]: any = await conn.query(`
            SELECT content_id, content_type, content, content_order
            FROM test_part_content
            WHERE part_id = ?
            ORDER BY content_order    
        `, [partId])

        const [questions] = await conn.query(`
            SELECT question_id, question_text, question_order
            FROM test_part_question
            WHERE part_id = ?
            ORDER BY question_order    
        `, [partId])

        return res.status(200).json({message: "success", data: {testId, part, partId,contents, questions}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    } finally {
        conn.release()
    }
})

router.post("/part_check", async (req: Request, res: Response) => {
    const userId = req.body.user
    const testId = req.body.testId
    const partId = req.body.partId
    const part = Number(req.body.part)
    const conn = await pool.getConnection()

    try {
        await conn.beginTransaction()

        await conn.query(`
            UPDATE user_test_part_progress SET status = "COMPLETED", completed_at = NOW()
            WHERE user_id = ? AND test_id = ? AND part_id = ?
        `,[userId, testId, partId])

        switch (part) {
            case 1:
                await conn.query(`
                    UPDATE user_test_progress
                    SET status = "IN_PROGRESS", started_at = IFNULL(started_at, NOW())
                    WHERE user_id = ? AND test_id = ? AND status = "NOT_STARTED"
                `,[userId, testId])             
                break
            case 5:
                const [[remain]]: any = await conn.query(`
                    SELECT COUNT(*) AS remain
                    FROM user_test_part_progress
                    WHERE user_id = ? AND test_id = ? AND status != "COMPLETED"
                `,[userId, testId])

                if (remain.remain === 0 ) {
                    await conn.query(`
                        UPDATE user_test_progress
                        SET status = "COMPLETED", completed_at = NOW()
                        WHERE user_id = ? AND test_id = ?
                    `,[userId, testId])
                }
                break
        }
        if (part < 5) {
            await conn.query(`
                UPDATE user_test_part_progress
                SET status = "IN_PROGRESS"
                WHERE user_id = ? AND test_id = ? AND part_id = (SELECT part_id FROM test_part WHERE test_id = ? AND part_no = ?) AND status = "NOT_STARTED"
            `,[userId, testId, testId, part+1])
        }

        await conn.commit()
        res.status(201).json({message: "success"})
    } catch (error) {
        console.log(error)
        await conn.rollback()
        res.status(500).json({message: "server error"})
    } finally {
        conn.release()
    }
})

export default router
