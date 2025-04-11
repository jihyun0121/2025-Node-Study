const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const travelRouter = require('./routes/travel');
const db = require('./db');


const port = 3001;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// __dirname : 현재 파일이 속한 절대 경로
// path.join을 사용하면 운영체제에 맞추어 경로 구분자(/,\)를 알아서 정해준다.

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/travel', (req, res, next) => {
    req.db = db;
    next();
}, travelRouter);

app.get('/add-travel', (req,res)=>{
    res.render('addTravel');
});

app.use((req, res)=>{
    res.status(404).send('404 Not Found');
})

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});