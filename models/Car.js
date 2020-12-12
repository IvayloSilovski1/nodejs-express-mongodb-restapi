const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = mongoose.model('Car', ({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    seller: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}))