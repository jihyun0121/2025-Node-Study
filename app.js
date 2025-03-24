const express = require('express');
const swagRouter = require('./routes/swag');
const comentRouter = require('./routes/coment');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/swag', swagRouter);
app.use('/coment', comentRouter);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

