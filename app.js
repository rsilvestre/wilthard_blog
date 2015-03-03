var express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , MongoClient = require('mongodb').MongoClient
  , multer = require('multer')
  , session = require('express-session')
  , sessionStore = require('sessionstore')
  , genUuid = require('./helper/genUuid.js')
  , swig = require('swig')
  , extras = require('swig-extras')
  , url = require('url')
  , redis = require('redis')
  , moment = require('moment')
  , ua = require('universal-analytics')
  , robots = require('robots.txt');

var routes = require('./routes');

var app = express();

MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/blog', function (err, db) {
    "use strict";
    if (err) throw err;

    var redisURL = url.parse(process.env.REDISCLOUD_URL || 'redis://localhost:6379');
    var client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
    if (redisURL.auth) {
        client.auth(redisURL.auth.split(":")[1]);
    }

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
    swig.setFilter('moment', function(input) {
        return moment(input).fromNow();
    });
    extras.useFilter(swig, 'markdown');

    app.use(ua.middleware('UA-60346132-1', {cookieName: '_ga'}));

    //app.use(robots(__dirname + '/robots.txt'));
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
        secret: 'keyboa4456sdfzv15zef4sFZ48fz65df',
        name: "tiny_cookie",
        store: sessionStore.createSessionStore(process.env.REDISCLOUD_URL?{url:process.env.REDISCLOUD_URL}: {
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
