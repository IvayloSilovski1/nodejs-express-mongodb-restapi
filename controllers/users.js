const User = require('../models/User');
const Car = require('../models/Car')


module.exports = {

    index: async(req, res, next) => {

        // 1. callbacks
        // User.find({}, (err, users) => {
        //     if (err) next(err);
        //     res.status(200).json(users);
        // })

        // 2. Promises
        // User.find({})
        //     .then(users => {
        //         // do something with users
        //         res.status(200).json(users);
        //     })
        //     .catch(err => {
        //         console.log("Index Func Error:", err);
        //         next(err);
        //     })

        // 3. Async / Await - with try / catch block
        // try {
        //     const users = await User.find({})
        //     res.status(200).json(users);
        // } catch (err) {
        //     console.log("Error:", err);
        //     next(err);
        // }

        // 3.1 Async / Await without try / catch
        // and using the express-promises-router
        const users = await User.find({});
        res.status(200).json(users);
    },

    // insert new user
    // validation done!
    newUser: async(req, res, next) => {
        // const firstname = req.body.firstname
        // const lastname = req.body.lastname
        // const email = req.body.email

        const firstname = req.value.body.firstname
        const lastname = req.value.body.lastname
        const email = req.value.body.email

        // console.log('req.value in newUser - Controllers', req.value);

        const newUser = new User({
            firstname,
            lastname,
            email
        })
        console.log(newUser);

        // console.log(newUser, ' - saved!');

        // 1. callbacks
        // newUser.save((err, user) => {
        //     console.log('Error:', err)
        //     console.log('user', user, ' - saved in MongoDB!')
        // check for errors
        //     if (err) next(err);
        //     res.status(201).json(user);
        // })

        // 2. Promises
        // newUser.save()
        //     .then(user => {
        //         console.log('User:', user, ' - saved in MongoDB successfully!');
        //         res.status(201).json(user);
        //     })
        //     .catch(err => {
        //         next(err);
        //     })

        // 3. Async / Await
        try {
            const savedUser = await newUser.save();
            console.log('Validated User:', savedUser, ' - saved in MongoDB successfully!');
            res.status(200).json(savedUser)
        } catch (err) {
            console.log("Error:", err);
            next(err);
        }
    },

    // validation done!
    getUser: async(req, res, next) => {
        // const userId = req.params.id;
        // const { userId } = req.params;
        // console.log('id:', userId)

        const { userId } = req.value.params;

        // validate userId with the idSchema
        // const result = idSchema.validate(req.params)
        // console.log('result', result)

        // const foundUser = await User.findById(result.value.userId);
        const foundUser = await User.findById(userId)
        console.log('Found User:', foundUser);
        res.status(200).json(foundUser);
    },


    replaceUser: async(req, res, next) => {
        // the request must contain all user data
        // const { userId } = req.params;
        // const newUser = req.body;

        // validate data
        const { userId } = req.value.params;
        const newUser = req.value.body;

        console.log('Id:', userId);
        console.log('newUser:', newUser)

        const result = await User.findByIdAndUpdate(userId, newUser);
        console.log('found and updated:', result);

        res.status(201).json(result);
    },

    updateUser: async(req, res, next) => {
        // can be passed only changed data
        const { userId } = req.value.params;
        const newUser = req.value.body;

        console.log('Id in updateUser:', userId);
        console.log('newUser in updateUser:', newUser)

        // validate userId with the idSchema
        // const resultValidation = idSchema.validate(req.value.params)

        const result = await User.findByIdAndUpdate(userId, newUser);
        console.log('found and updated in updateUser:', result);

        res.status(201).json(result);
    },

    getUserCars: async(req, res, next) => {
        const { userId } = req.value.params;

        // validate userId with the idSchema
        // const result = idSchema.validate(req.value.params)

        // use .populate('cars') to get the whole car objects and not just the ID of the car
        const user = await User.findById(userId).populate('cars');
        const userCars = user.cars;
        // get array of cas assigned to this user as a result
        res.status(200).json(userCars)
    },

    newUserCar: async(req, res, next) => {
        const { userId } = req.value.params;

        // validate userId with the idSchema
        // const result = idSchema.validate(req.params)

        // create a new car
        const newCar = new Car(req.body);
        console.log('New Car: ', newCar);

        // get user
        const user = await User.findById(userId);

        // assign user as a car seller
        newCar.seller = user;
        console.log('User assigned to car:', newCar);

        // save car
        await newCar.save();

        // add car to users array of cars
        await user.cars.push(newCar);

        // save user again
        await user.save()

        res.status(201).json(newCar);
    }
}