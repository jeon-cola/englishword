import express, {Request, Response} from "express"
import mysql from "mysql2/promise"
import cors from "cors"

const app = express()
// const dbconfig = require("./config/dbconfig.json")

// const pool = mysql.createPool({
//   host: dbconfig.host,
//   user: dbconfig.user,
//   password: dbconfig.password,
//   database: dbconfig.database,
// })

// async function connectDB() {
//   try {
//     const conn  = await pool.getConnection()
//     console.log("DB connected")
//     conn.release()  
//   } catch (error) {
//     console.error("DB connection error:", error)
//   }
// }
// connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))



app.get("/login", (req: Request, res: Response) => {
  
})

app.post("/signup", (req: Request, res: Response) => {
  const id = req.body.id
  const password = req.body.password
  const nickname = req.body.nickname
  const birthday = req.body.birthday
  console.log(id, password, nickname, birthday)
})

app.listen(8080, () => {
    console.log("start server")
  })
