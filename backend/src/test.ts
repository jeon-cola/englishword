import { upload } from "./storage"
import pool from "./pool"
import {Router, Request, Response} from "express"

const router = Router()

router.post("/test", async (req : Request, res : Response) => {
    const conn = await pool.getConnection()
    try {
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

        res.status(201).json({message: "success", testId})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
})

router.post("/part", upload.any(), async (req: Request, res: Response) => {
    const testId = Number(req.body.testId)
    const parts = JSON.parse(req.body.parts)
    const files = req.files as Express.Multer.File[]

    const conn = await pool.getConnection()

    try {
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
        return res.status(500).json({message: error})
    }
})

router.get("/reach_test", async (req: Request, res: Response) => {
    const userId = req.query.userId
    const conn = await pool.getConnection()

    try {
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
            return res.status(201).json({message: "success", data: result})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error})
    }

})

export default router