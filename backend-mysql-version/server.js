const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DATABASE CONNECTION ================= */

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

/* ================= GET ALL USERS ================= */

app.get("/", (req, res, next) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, results) => {
    if (err) return next(err);
    // return res.status(500).json({ message: "DB Error" }); // manually need to add without next
    res.json({ success: true, data: results });
  });
});

/* ================= CREATE USER ================= */

app.post("/create", (req, res, next) => {
  const { name, address, telephone } = req.body;

  if (!name || !address || !telephone) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const sql = "INSERT INTO users (name, address, telephone) VALUES (?, ?, ?)";

  db.query(sql, [name, address, telephone], (err, result) => {
    if (err) return next(err);

    res.json({
      success: true,
      message: "User created successfully",
      userId: result.insertId,
    });
  });
});

/* ================= GET USER BY ID ================= */

app.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const sql = "SELECT * FROM users WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, data: results[0] });
  });
});

/* ================= UPDATE USER ================= */

app.put("/update/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, address, telephone } = req.body;

  const sql =
    "UPDATE users SET name = ?, address = ?, telephone = ? WHERE id = ?";

  db.query(sql, [name, address, telephone, id], (err, result) => {
    if (err) return next(err);

    res.json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  });
});

/* ================= DELETE USER ================= */

app.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return next(err);

    res.json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  });
});

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
