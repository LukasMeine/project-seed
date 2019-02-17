const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
var cors = require('cors')
const morgan     = require('morgan');
const expressValidator = require('express-validator');
var { Validator, ValidationError } = require('express-json-validator-middleware');

//Configuring the log to console
app.use(morgan('dev'));
app.use(expressValidator());

//Configuring the json body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port     = process.env.PORT || 8080; // set our port


app.use(cors());


//Registering the routes exported from index
app.use(require('./app/router/index'));
app.use('/login',require('./app/router/login'));
app.use('/users',require('./app/router/users'));

app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
        // At this point you can execute your error handling code
        res.status(400).send({code: 400, message: err});
        next();
    }
    else next(err); // pass error on if not a validation error
});

//Starts the server
app.listen(port);
console.log('Server running at port ' + port);
