require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const https = require("https");
const http = require("http");

const httpApp = http.createServer(app);

// cors 설정
const cors = require('cors');
app.use(cors());

app.use(express.json()); // json 파서

// 정적 파일 경로
app.use(express.static(__dirname + '/public'));

// 데이터 베이스
const db = require('./plugins/mysql');
const { disconnect } = require('process');
app.set('db', db);

// 서버 리슨
httpApp.listen(process.env.PORT, () => {
	console.log(`Express Server Listen on http://localhost:${process.env.PORT}`);
});