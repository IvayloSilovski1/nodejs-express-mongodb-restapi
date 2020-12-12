const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const helmet = require('helmet')


// dotenv middleware
dotenv.config();

// Routes
const UsersRouter = require('./routes/users');
const CarsRouter = require('./routes/cars')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('Connected to MognoDB - restapi'))

const app = express();

// middleware
app.use(logger('dev'));
// app.use(logger('production'));
// app.use(logger('combined'));


// body parser middleware
app.use(express.json());

// cors middleware - security
app.use(cors())

// helmet middleware - security
app.use(helmet())
    // disable x-powered-by
app.disable('x-powered-by')


// routes
// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'You requested index page'
//     })
// })

// route middleware
app.use('/users', UsersRouter);
app.use('/cars', CarsRouter);


// catch 404 Errors and forward the error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})


// error handler functions
app.use((err, req, res, next) => {
    // check if we are in development => if yes, get errors, else no errors displayed
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500;

    // respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })


    // respond to ourselves
    console.error(err);
})




// start server
app.listen(3000, () => console.log('Server started'));