// const router = require('express').Router();
const router = require('express-promise-router')();
const UsersController = require('../controllers/users')

const {
    schemas,
    validateParams,
    validateBody
} = require('../helpers/routeHelpers');



router.route('/')
    .get(UsersController.index)
    .post(validateBody(schemas.userSchema), UsersController.newUser)


router.route('/:userId')
    .get(validateParams(schemas.idSchema, 'userId'), UsersController.getUser)

.put(
    [
        validateParams(schemas.idSchema, 'userId'),
        validateBody(schemas.userSchema)
    ],
    UsersController.replaceUser)

.patch(
    [
        validateParams(schemas.idSchema, 'userId'),
        validateBody(schemas.userOptionalSchema)
    ],
    UsersController.updateUser)


router.route('/:userId/cars')
    .get(
        [
            validateParams(schemas.idSchema, 'userId')
        ],
        UsersController.getUserCars)
    .post(
        [
            validateParams(schemas.idSchema, 'userId'),
            validateBody(schemas.carSchema)
        ],
        UsersController.newUserCar)




module.exports = router;