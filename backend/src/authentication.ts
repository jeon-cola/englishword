import pool from "./pool"
import {Router, Request, Response} from "express"
import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"


const mailConfig = require("../config/mailConfig.json")
const router = Router()
const sessionconfig = require("../config/sessionconfig.json")


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
    req.session.regenerate((err) => {
      if (err) throw err
        req.session.user = { id: user.id, name: user.name }
        req.session.save((err) => {
          if (err) throw err
          res.status(200).json({ message: "successful", user: req.session.user})
        })
    })
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

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
      return res.status(500).send("error")
    }
    res.clearCookie(sessionconfig.key)
    res.status(200).json({ message: "successful" })
  })
})

router.post("/check", async (req: Request, res: Response) => {
  const email = req.body.email
  try {
    const conn = await pool.getConnection()
    const sql = `SELECT * FROM users WHERE id = ?`
    const [result] = await conn.query(sql, [email])
    conn.release()
    if ((result as any).length === 0) {
      res.status(200).json({ message: "available" })
    } else {
      res.status(200).json({ message: "unavailable" })
    }
  } catch (error) {
    res.status(500).json({message: "server error"})
  }
})

// 임시 비밀번호 생성
const gernerateTempPassword = (length = 8) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  let temp = ""
  for (let i = 0; i < length; i++) {
    temp += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return temp
}

const sendTempPasswordEmail = async (to : string, tempPassword: string) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: mailConfig.users,
      pass: mailConfig.pass
    }
    })
  )
  const mailOptions = {
    from : process.env.Mail_Email,
    to,
    subject: "임시 비밀번호 발급",
    text : `귀하의 임시 비밀번호는 ${tempPassword} 입니다. 로그인 후 반드시 변경해주세요`
  }

  await transporter.sendMail(mailOptions)
}

router.post("/forgot_email", async (req: Request, res: Response) => {
  const email = req.body.email
  try {
    const conn = await pool.getConnection()
    const sql = `SELECT * FROM users WHERE id = ?`
    const [result] = await conn.query(sql, [email])
    if ((result as any).length === 0) {
      res.status(200).json({ message: "failful" })
    } else {
      const tempPassword = gernerateTempPassword()
      await conn.query(`UPDATE users SET password =? WHERE id = ?`, [tempPassword, email])

      await sendTempPasswordEmail(email, tempPassword)
      res.status(200).json({ message: "successful" })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "server error"})
  }
})

  export default router