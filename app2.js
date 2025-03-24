const express = require('express');
const path = require('path');

const app = express();

const travelList = ['뉴욕', '파리', '서울', '도쿄'];

app.set('view engine', 'ejs');
// _dirname : 현재 파일이 속한 절대경로
// path.join()을 사용하면 운영체제에 맞추어 경로 구분자(/, \)를 알아서 정해준다
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/travel', (req, res) => {
    res.render('travel', {travelList});
});

app.listen(3001, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  });