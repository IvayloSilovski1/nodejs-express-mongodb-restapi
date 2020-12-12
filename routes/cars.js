const router = require('express-promise-router')();

const CarsController = require('../controllers/cars');
const {
    schema,
    validateParams,
    validateBody
} = require('../helpers/routeHelpers')


router.route('/')
    .get(CarsController.index)
    .post(CarsController.newCar)


module.exports = router;