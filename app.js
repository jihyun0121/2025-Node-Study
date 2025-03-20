const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!\n');
});

app.get('/swag', (req, res) => {
  res.send('get swag');
});

app.post('/swag', (req, res) => {
  res.send('post swag');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});