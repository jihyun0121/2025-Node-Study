const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('get swag');
});

router.get('/:person', (req, res) => {
    res.send(req.params.person);
});

router.post('/', (req, res) => {
    res.send(req.body);
});

module.exports = router;