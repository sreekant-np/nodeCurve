const { json } = require('express');
const express = require('express');
const app = express();

//middleware
app.use(express.json());
//user read file

const userController = require('../controllers/userController');

const router = express.Router();
router.param('id', userController.checkId);
router.route('/').get(userController.getAllData).post(userController.postReq);
router
  .route('/:id')
  .get(userController.getSingledata)
  .put(userController.updateReq)
  .delete(userController.delReq);

module.exports = router;
