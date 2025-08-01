import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

(async () => {
  const pool = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789Flanco?",
    database: "hr",
  });

  const email = "admin@example.com";
  const plainPassword = "123";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

  console.log("Test user created");
  process.exit();
})();
