const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/',(req,res)=>{
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
});

router.get('/:id',(req,res)=> {
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
});

router.get('/:id/edit',(req,res)=> {
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
});

router.put('/:id',(req, res)=> {
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
});

router.post('/', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO travelList (name) VALUES (?)';
    db.query(query, [name], (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 실패:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/travel');
    });
});

router.delete('/:id', (req, res)=>{
    const travelID = req.params.id;
    const _query = 'DELETE FROM travellist WHERE id = ?';
    db.query(_query, [travelID], (err, results)=>{
        if(err){
            console.error('DB 쿼리 실패', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('deleteSuccess');
    });
});

module.exports = router;