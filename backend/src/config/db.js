import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create a connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "123456",
  database: process.env.DB_NAME || "investtrack",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Log connection status
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Stop server if DB connection fails
  } else {
    console.log("✅ Connected to MySQL database!");
    connection.release(); // Release connection back to pool
  }
});

export default db;
