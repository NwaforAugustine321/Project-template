const express = require('express');
const userRouter = require('../src/Router/user');

const app = express();
app.use(express.json());

app.use('/api/v1.0', userRouter);

module.exports = app;
