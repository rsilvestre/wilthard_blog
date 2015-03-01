var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var MongoClient = require('mongodb').MongoClient;
//var mongoskin = require('mongoskin');
var multer = require('multer');
var session = require('express-session');
var sessionStore = require('sessionstore');
var genUuid = require('./helper/genUuid.js');
var swig = require('swig');
var extras = require('swig-extras');

var routes = require('./routes');

var app = express();

MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/blog', function (err, db) {
    "use strict";
    if (err) throw err;

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    //app.set('view engine', 'jade');
    app.engine('swig', swig.renderFile);
    app.set('view engine', 'swig');
    swig.setFilter('length', function(input) {
        if( Object.prototype.toString.call( input ) === '[object Array]' ) {
            return input.length;
        }
    });
    extras.useFilter(swig, 'markdown');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(methodOverride("_method"));
    //app.use(methodOverride(function(req, res){
    //    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    //        // look in urlencoded POST bodies and delete it
    //        var method = req.body._method;
    //        delete req.body._method;
    //        return method;
    //    }
    //}));
    app.use(session({
        genid: function (req) {
            return genUuid(); // use UUIDs for session IDs
        },
        secret: 'keyboard cat is a small one',
        name: "tiny_cookie",
        store: sessionStore.createSessionStore({
            type: 'redis',
            host: 'localhost',         // optional
            port: 6379,                // optional
            prefix: 'sess',            // optional
            ttl: 804600,               // optional
            timeout: 10000             // optional
        }),
        resave: true,
        saveUninitialized: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(multer({
        dest: './uploads/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
        },
        limits: {
            fieldNameSize: 50,
            fieldSize: 4000000,
            files: 2,
            fields: 10
        }
    }));
    app.use(express.static(path.join(__dirname, 'public')));

    // Application routes
    routes(app, db);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.set('view cache', false);
        swig.setDefaults({cache: false});
        app.use(function (err, req, res, next) {
            console.error(err.message);
            console.error(err.stack);
            res.status(err.status || 500);
            res.render('error_template', {
                title: 'Internal error',
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error_template', {
            message: err.message,
            error: {}
        });
    });

});

module.exports = app;
