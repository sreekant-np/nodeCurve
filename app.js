const express = require('express');
const path = require('path');
const app = express();
const port = 3030;
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
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

app.use(express.static(`${__dirname}/public`));

//routes
const tourRouter = require('./routes/tours');
const userRouter = require('./routes/user');
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const db = process.env.DB_CLOUD.replace('<PASSWORD>', process.env.DB_PASS);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    try {
      console.log('Db connection is succesful');
    } catch (error) {
      console.log('Error connecting to the db');
    }
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const TOUR = new mongoose.model('TOUR', tourSchema);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
