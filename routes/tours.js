const express = require('express');
const app = express();

//middleware
app.use(express.json());
const router = express.Router();
router.param('id', (req, res, next, val) => {
  console.log(`${val}`);
  next();
});

const tourController = require('../controllers/tourController');
router.param('id', tourController.checkId);
router
  .route('/:id')
  .delete(tourController.del)
  .patch(tourController.patchReq)
  .get(tourController.getSingleData)
  .put(tourController.putReq);
router.route('/').get(tourController.getAllreq).post(tourController.postReq);

module.exports = router;
