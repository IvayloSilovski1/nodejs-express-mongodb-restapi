const User = require('../models/User');
const Car = require('../models/Car')


module.exports = {
    index: async(req, res, next) => {
        // get all the cars
        const allCars = await Car.find({})
        return res.status(200).json(allCars);
    },

    newCar: async(req, res, next) => {

        // find the seller 
        const seller = await User.findById(req.body.seller);
        console.log('Seller:', seller)

        // create new car
        const newCar = req.body;
        delete newCar.seller;

        console.log('newCar:', newCar)

        const car = new Car(newCar);
        // save the new car to mongodb
        await car.save();

        // add the new car to the seller
        seller.cars.push(car);
        await seller.save();

        res.status(200).json(car);
    }
}