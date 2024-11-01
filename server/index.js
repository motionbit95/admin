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

const commonRouter = require("./routers/common");
const accountRouter = require("./routers/account");
const ganntChartRouter = require("./routers/gannt-chart");
app.use("/", commonRouter);
app.use("/account", accountRouter);
app.use("/gannt-chart", ganntChartRouter);

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

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
