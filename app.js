var createError = require('http-errors');
var express = require('express');
var path = require('path');
var AWS = require("aws-sdk");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require("express-session");
var flash = require("connect-flash");
var dynamostore = require("connect-dynamodb")(session);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var app = express();
var options = {
    // Optional DynamoDB table name, defaults to 'sessions'
    table: 'mySessions',
    AWSConfigJSON: {
        accessKeyId: "AKIAIPKTQD44TJXEEIKQ",
        secretAccessKey: "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",
        region: 'https://dynamodb.us-west-2.amazonaws.com'
    },
// // Optional client for alternate endpoint, such as DynamoDB Local
client: new AWS.DynamoDB({ endpoint: new AWS.Endpoint('https://dynamodb.us-west-2.amazonaws.com')}),
    readCapacityUnits : 25,
    writeCapacityUnits : 25
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use(session({secret: 'max', saveUninitialized: false, resave: false}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use(flash());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next(createError(404));
});
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
