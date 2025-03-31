const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/submit', (req, res) => {
    const {name, year} = req.body;
    res.send(`Name: ${name}, Year: ${year}`);
});

app.listen(3001, () => {
    console.log(`서버가 http://localhost:3001 에서 실행 중입니다.`);
  });