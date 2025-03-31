const { error } = require('console');
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

travelList = ['뉴욕', '파리', '서울', '도쿄'];

app.set('view engine', 'ejs');
// _dirname : 현재 파일이 속한 절대경로
// path.join()을 사용하면 운영체제에 맞추어 경로 구분자(/, \)를 알아서 정해준다
app.set('views', path.join(__dirname, 'views'));

db.connect(error => {
    if (error) {
        console.log('MySQL 연결 실패: ', error);
        return;
    }
    console.log('MySQL에 연결 되었습니다.');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/travel', (req, res) => {
    const query = 'SELECT id, name FROM travelList';
    db.query(query, (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패');
            res.status(500).send('Internal Server Error');
            return;
        }
        travelList = results;
    });
    res.render('travel', {travelList});
});

app.get('/travel/:id', (req, res) => {
    const travelID = req.params.id;
    const query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(query,[travelID], (err, results) => {  //sql 인젝션 방지
        if(err) {
            console.error('DB 쿼리 실패: ', err);
            res.status(500).send('내부 서버 에러');
            return;
        }
        if(results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = results[0];
        res.render('travelDetail', {travel});
    })
});

app.listen(3001, () => {
    console.log(`서버가 http://localhost:3001 에서 실행 중입니다.`);
  });