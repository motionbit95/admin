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
  res.send("계정!");
});

module.exports = router;
