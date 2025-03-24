const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('댓글 가져오기');
});

router.post('/', (req, res) => {
    res.send(req.body);
});

router.get('/:coment', (req, res) => {
    res.send(req.params.coment);
});

module.exports = router;