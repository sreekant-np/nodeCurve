const express = require('express');
const app = express();
const portNum = 3300;
app.listen(portNum, () => {
  console.log(`listeing to port at${portNum}`);
});
