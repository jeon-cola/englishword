import pool from "./pool"
import {Router, Request, Response} from "express"

const router = Router()

router.post("/login", async (req: Request, res: Response) => {
  const {id, password} = req.body
  
  try {
    const [rows]: any =  await pool.query(`SELECT * FROM users WHERE id = ?`, [id])

    if (rows.length === 0) {
      return res.status(401).json({ message: "존재하지 않는 ID입니다"})
    }

    const user = rows[0]
    const isMatch = (password === user.password)

    if (!isMatch) {
      return res.status(401).json({ message : "비밀번호가 일치하지 않습니다." })
    }
    res.status(200).json({ message: "successful", user: { id: user.id, name: user.name } })
  } catch (error) {
    console.log(error)
    res.status(500).send("Server error")
  }
})

router.post("/signup", async (req: Request, res: Response) => {
  const {id, password, nickname, birthday} = req.body
  try {
    const conn = await pool.getConnection()

    const sql = `INSERT INTO users (id, password, name, birthday) VALUES (?, ?, ?, ?)`
    const [result]  = await conn.query(sql, [id, password, nickname, birthday])

    conn.release()
    console.log(result)
    res.status(201).send("successful")

  } catch (error) {
    console.log(error)
    res.status(500).send("Server error")
  }
})

export default router