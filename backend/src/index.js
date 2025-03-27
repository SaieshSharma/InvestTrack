import app from "./app.js";
import db from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Ensure DB Connection Before Starting Server
db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    process.exit(1);
  }
  console.log("Connected to MySQL database ✅");

  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
