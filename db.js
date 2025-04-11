const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(err=> {
    if (err) {
        console.err("mysql 연결 실패 : ", err);
        return;
    }
    console.log("mysql에 연결되었습니다.")
})

module.exports = db;