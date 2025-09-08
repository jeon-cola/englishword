import mysql from "mysql2/promise"
const dbconfig = require("../config/dbconfig.json")
const pool = mysql.createPool({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
})
export default pool