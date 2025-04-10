const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

const port = 3001;

dotenv.config();

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine','ejs');

// __dirname : 현재 파일이 속한 절대 경로
// path.join을 사용하면 운영체제에 맞추어 경로 구분자(/,\)를 알아서 정해준다.
app.set('views',path.join(__dirname,'views'));

db.connect(err=> {
    if (err) {
        console.err("mysql 연결 실패 : ",err);
        return;
    }
    console.log("mysql에 연결되었습니다.")
})

app.get('/travel',(req,res)=>{
    const query = 'SELECT id, name FROM travelList';
    db.query(query, (err, results)=>{
        if(err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel',{travelList})
    })
})

app.get('/travel/:id',(req,res)=> {
    const travelID = req.params.id;
    const _query = 'SELECT * FROM travelList WHERE id = ?';
    db.query(_query, [travelID], (err, results)=> {
        if (err) {
            console.error('DB 쿼리 실패',err);
            res.status(500).send('내부 서버 에러');
            return;
        }
        if(results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = results[0];
        res.render('travelDetail',{travel});
    })
})

app.get('/', (req, res) => {
    res.render('home');
});


app.post('/travel',(req,res)=>{
    const {name} = req.body;
    const _query = 'INSERT INTO travelList (name) VALUES (?)';
    db.query(_query,[name],(err,results)=>{
        if(err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/travel');
    })
})

app.put('/travel/:id',(req,res)=> {
    const travelID = req.params.id;
    const {name} = req.body;
    const _query = 'UPDATE travelList SET name = ? WHERE id = ?';
    db.query(_query, [name, travelID], (err, results)=> {
        if (err) {
            console.error('DB 쿼리 실패',err);
            res.status(500).send('내부 서버 에러');
            return;
        }
        if(results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        res.render('updateSuccess');
    })
})

app.get('/travel/:id/edit',(req,res)=> {
    const travelID = req.params.id;
    const _query = 'SELECT * FROM travelList WHERE id = ?';
    db.query(_query, [travelID], (err, results)=> {
        if (err) {
            console.error('DB 쿼리 실패',err);
            res.status(500).send('내부 서버 에러');
            return;
        }
        if(results.length === 0) {
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = results[0];
        res.render('editTravel',{travel});
    })
})



app.get('/add-travel',(req,res)=>{
    res.render('addTravel');
})

app.use((req,res)=>{
    res.status(404).send('404 Not Found');
})

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
  