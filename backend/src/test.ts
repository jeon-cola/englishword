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

router.post("/part", async (req: Request, res: Response) => {
    const {testId, parts} = req.body
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
                    await conn.query(`
                        INSERT INTO test_part_content (part_id, content_type, content, content_order)
                        VALUES (?, ?, ?, ?)
                    `, [partId, c.type, c.content, c.order])
                }
            }

            if (part.question?.length) {
                for (const q of part.questions) {
                    await conn.query(`
                        INSERT INTO test_part_question (part_id, question_text, question_order)
                        VALUES (?, ?, ?)
                    `, [partId, q.text, q.order])
                }
            }

            await conn.commit()
            return res.status(201).json({message: "success"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
})

export default router