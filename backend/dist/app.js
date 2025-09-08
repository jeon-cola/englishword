"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pool_1 = __importDefault(require("./pool"));
const authentication_1 = __importDefault(require("./authentication"));
const express_session_1 = __importDefault(require("express-session"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const app = (0, express_1.default)();
const sessionconfig = require("../config/sessionconfig.json");
const MySQLStoreSession = (0, express_mysql_session_1.default)(express_session_1.default);
const sessionStore = new MySQLStoreSession({}, pool_1.default);
async function connectDB() {
    try {
        const conn = await pool_1.default.getConnection();
        console.log("DB connected");
        conn.release();
    }
    catch (error) {
        console.error("DB connection error:", error);
    }
}
connectDB();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
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
}));
app.use("/api/auth", authentication_1.default);
app.listen(8080, () => {
    console.log("start server");
});
