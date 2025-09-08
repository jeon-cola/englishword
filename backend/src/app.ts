import express, {Request, Response} from "express"
import cors from "cors"
import pool from "./pool"
import authRouter from "./authentication"


const app = express()


async function connectDB() {
  try {
    const conn  = await pool.getConnection()
    console.log("DB connected")
    conn.release()  
  } catch (error) {
    console.error("DB connection error:", error)
  }
}
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use("/api/auth", authRouter)

app.listen(8080, () => {
    console.log("start server")
  })
