const express = require('express');
const swagRouter = require('./routes/swag');

const app = express();

app.use(express.json());
app.use('/swag', swagRouter);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});