"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
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
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get("/login", (req, res) => {
});
app.post("/signup", (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const birthday = req.body.birthday;
    console.log(id, password, nickname, birthday);
});
app.listen(8080, () => {
    console.log("start server");
});
