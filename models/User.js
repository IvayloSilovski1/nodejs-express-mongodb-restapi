const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }]

})


const User = mongoose.model('User', UserSchema);
module.exports = User;