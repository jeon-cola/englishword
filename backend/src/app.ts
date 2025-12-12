import express, {Request, Response} from "express"
import cors from "cors"
import pool from "./pool"
import authRouter from "./authentication"
import session from "express-session"
import MySQLStore from "express-mysql-session"


const app = express()

const sessionconfig = require("../config/sessionconfig.json")
const MySQLStoreSession = MySQLStore(session as any)
const sessionStore = new MySQLStoreSession({}, pool as any)

app.use('/uploads', express.static("uploads"))

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  name: sessionconfig.key,
  secret: sessionconfig.secret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour,
    httpOnly: true,
    secure: false,
  }
}))

app.use("/api/auth", authRouter)

app.listen(8080, () => {
    console.log("start server")
  })
