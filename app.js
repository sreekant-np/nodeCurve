const express = require('express');
const path = require('path');
const app = express();
const port = 3030;
const morgan = require('morgan');

//middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the server');
  next();
});
app.use((req, res, next) => {
  req.requesTime = new Date().toISOString();
  next();
});

//routes
const tourRouter = require('./routes/tours');
const userRouter = require('./routes/user');
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
