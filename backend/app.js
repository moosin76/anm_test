require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const https = require("https");
const http = require("http");

function getHttps(app) {
	try {
		const cryptPath = "/etc/letsencrypt/live/erp.ezcode.kr";
		const httpsOptions = {
			key: fs.readFileSync(`${cryptPath}/privkey.pem`),
			cert: fs.readFileSync(`${cryptPath}/cert.pem`),
			ca: fs.readFileSync(`${cryptPath}/chain.pem`),
		};
		return https.createServer(httpsOptions, app);
	} catch {
		return null;
	}
}

const httpApp = http.createServer(app);
const httpsApp = getHttps(app);

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
if (httpsApp != null) {
	httpsApp.listen(process.env.PORT, () => {
		console.log(`Express Server Listen on https://localhost:${process.env.PORT}`);
	});
} else {
	httpApp.listen(process.env.PORT, () => {
		console.log(`Express Server Listen on http://localhost:${process.env.PORT}`);
	});
}