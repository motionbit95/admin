require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");

const router = express.Router();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
router.use(bodyParser.json());
router.use(cors());

// MySQL 연결 설정
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// 기본 라우트
router.get("/", (req, res) => {
  res.send("간트차트!");
});

// 프로젝트 추가 엔드포인트
router.post("/projects/create", async (req, res) => {
  const { project_name, description, start_date, end_date } = req.body;

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

// 프로젝트 리스트 엔드포인트
router.get("/projects", async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT * FROM projects");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

// 프로젝트 삭제 엔드포인트
router.delete("/projects/:project_id", async (req, res) => {
  const { project_id } = req.params;

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    await connection.execute(`DELETE FROM projects WHERE project_id = ?`, [
      project_id,
    ]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }

  res.status(200).json({ message: "Project deleted successfully" });
});

// 프로젝트 수정 엔드포인트
router.patch("/projects/:project_id", async (req, res) => {
  const { project_id } = req.params;
  const { project_name, description, start_date, end_date } = req.body;

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    await connection.execute(
      `UPDATE projects SET project_name = ?, description = ?, start_date = ?, end_date = ? WHERE project_id = ?`,
      [project_name, description, start_date, end_date, project_id]
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }

  res.status(200).json({ message: "Project updated successfully" });
});

// 작업 추가 엔드포인트
router.post("/tasks/create", async (req, res) => {
  const {
    project_id,
    task_name,
    assigned_to,
    start_date,
    end_date,
    status,
    progress_percentage,
  } = req.body;

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    connection.execute(
      `INSERT INTO tasks (project_id, task_name, assigned_to, start_date, end_date, status, progress_percentage) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        project_id,
        task_name,
        assigned_to,
        start_date,
        end_date,
        status,
        progress_percentage,
      ]
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      connection.end();
    }
  }

  res.status(201).json({ message: "Task created successfully" });
});

// 작업 리스트 엔드포인트
router.get("/tasks", async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT * FROM tasks");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

// 작업 삭제 엔드포인트
router.delete("/tasks/:task_id", async (req, res) => {
  const { task_id } = req.params;

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    await connection.execute(`DELETE FROM tasks WHERE task_id = ?`, [task_id]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  } finally {
    if (connection) {
      await connection.end();
    }
  }

  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;
