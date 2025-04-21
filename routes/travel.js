const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', async (req,res)=>{
    try {
        const query = 'SELECT id, name FROM travelList';
        const travelList = await db.query(query);
        res.render('travel', { travelList });
    } catch (err) {
        console.error('데이터베이스 쿼리 실패 : ', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req,res)=> {
    const travelID = req.params.id;
    try {
        const _query = 'SELECT * FROM travelList WHERE id = ?';
        const results = await db.query(_query, [travelID]);
        if (results.length === 0) {
            return res.status(404).send('여행지를 찾을 수 없습니다.');
        }
        const travel = results[0];
        res.render('travelDetail', { travel });
    } catch (err) {
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
    }
});

router.get('/:id/edit', async (req,res)=> {
    const travelID = req.params.id;
    try {
        const _query = 'SELECT * FROM travelList WHERE id = ?';
        const [results] = await db.query(_query, [travelID]);
        if (results.length === 0) {
            return res.status(404).send('여행지를 찾을 수 없습니다.');
        }
        const travel = results[0];
        res.render('editTravel', { travel });
    } catch (err) {
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
    }
});

router.put('/:id', async (req, res)=> {
    const travelID = req.params.id;
    const { name } = req.body;
    try {
        const _query = 'UPDATE travelList SET name = ? WHERE id = ?';
        const result = await db.query(_query, [name, travelID]);
        if (result.affectedRows === 0) {
            return res.status(404).send('여행지를 찾을 수 없습니다.');
        }
        res.render('updateSuccess');
    } catch (err) {
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const query = 'INSERT INTO travelList (name) VALUES (?)';
        await db.query(query, [name]);
        res.redirect('/travel');
    } catch (err) {
        console.error('데이터베이스 쿼리 실패:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res)=>{
    const travelID = req.params.id;
    try {
        const _query = 'DELETE FROM travelList WHERE id = ?';
        const result = await db.query(_query, [travelID]);
        if (result.affectedRows === 0) {
            return res.status(404).send('여행지를 찾을 수 없습니다.');
        }
        res.render('deleteSuccess');
    } catch (err) {
        console.error('DB 쿼리 실패', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;