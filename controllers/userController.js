const fs = require('fs');
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

//checkid

exports.checkId = (req, res, next, val) => {
  const id = Number(req.params.id);
  if (id > users.length) {
    res.send('Invalid id');
  }
  next();
};

//get all data
exports.getAllData = (req, res) => {
  res.send(users);
};
//get single data
exports.getSingledata = (req, res) => {
  const id = Number(req.params.id);
  const user = users[id - 1];
  if (id > users.length || id <= 0) {
    res.send('invalid user id');
  } else {
    res.send(user);
  }
};
//post request
exports.postReq = (req, res) => {
  const newId = users.length + 1;
  const postData = Object.assign({ id: newId }, req.body);
  users.push(postData);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) throw err;
      res.send({
        data: postData,
      });
    }
  );
};
//update req
exports.updateReq = (req, res) => {
  const id = Number(req.params.id);
  users[id - 1].name = req.body.name;
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) throw err;
      res.send(users[id - 1].name);
    }
  );
};

exports.delReq = (req, res) => {
  const id = Number(req.params.id);
  if (id > users.length) {
    res.send('Invalid user id');
  } else {
    res.send(req.body.nam);
  }
};
