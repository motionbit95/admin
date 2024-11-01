require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors());

// MySQL 연결 설정
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// 기본 라우트
app.get("/", (req, res) => {
  res.send("Hello, Express with MySQL!");
});

app.get("/create/users", (req, res) => {
  // MySQL 연결
  db.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  // 테이블 생성 예제
  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

  db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    res.send(200);
  });
});

// 프로젝트 추가 엔드포인트
app.post("/projects", async (req, res) => {
  const { project_name, description, start_date, end_date } = req.body;

  console.log(dbConfig);

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      `INSERT INTO projects (project_name, description, start_date, end_date) VALUES (?, ?, ?, ?)`,
      [project_name, description, start_date, end_date]
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }

  res.status(201).json({ message: "Project created successfully" });
});

// 작업 추가 엔드포인트
app.post("/tasks", (req, res) => {
  const {
    project_id,
    task_name,
    assigned_to,
    start_date,
    end_date,
    status,
    progress_percentage,
  } = req.body;

  const sql =
    "INSERT INTO tasks (project_id, task_name, assigned_to, start_date, end_date, status, progress_percentage) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      project_id,
      task_name,
      assigned_to,
      start_date,
      end_date,
      status,
      progress_percentage,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting task:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({
        id: result.insertId,
        project_id,
        task_name,
        assigned_to,
        start_date,
        end_date,
        status,
        progress_percentage,
      });
    }
  );
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
