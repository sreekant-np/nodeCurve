const fs = require('fs');
//------------------file read
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//------------------Check id
exports.checkId = (req, res, next, val) => {
  const id = Number(req.params.id);
  if (id > tours.length) {
    res.send('Invalid id');
  }
  next(); 
};

//-------------------GET ALL DATA
exports.getAllreq = (req, res) => {
  console.log(req.requesTime);
  res.json({
    createdAt: req.requesTime,
    tours,
  });
};

//-------------------GET INDIVIDUAL DATA
exports.getSingleData = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((tours) => tours.id === id);
  res.send({ id: tour.id, duration: tour.duration });
};

//-----------------------POST DATA
exports.postReq = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};

//------------------UPDATE DATA
exports.putReq = (req, res) => {
  const newId = Number(req.params.id);
  fs.readFile(`${__dirname}/dev-data/data/tours-simple.json`, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      var readData = JSON.parse(data);
      readData.forEach((element) => {
        if (element.id === newId) {
          if (element.duration == null) {
            return;
          }
          element.duration = req.body;
        }
      });
      fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(readData),
        (err) => {
          console.log(err);
        }
      );
    }
  });
};

//------------------PATCH DATA
exports.patchReq = (req, res) => {
  const id = Number(req.params.id);
  res.send({
    duration: 'updated duration',
  });
};
//-----------------Delete data
exports.del = (req, res) => {
  const id = Number(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
