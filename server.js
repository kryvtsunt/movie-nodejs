var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


// const HEROKU_MONGO_URL = 'mongodb://localhost/tk-movie'
const HEROKU_MONGO_URL = 'mongodb://admin:admin42@ds117691.mlab.com:17691/heroku_bh9clvbf';

mongoose.connect(HEROKU_MONGO_URL);




var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin",
//         "http://localhost:4200");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "https://tk-movie-angular.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/message/:theMessage', function (req, res) {
    var theMessage = req.params['theMessage'];
    res.send(theMessage);
})

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);
// app.get('/api/session/get',
//   getSessionAll);
// app.get('/api/session/reset',
//   resetSession);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}

var commentService = require('./services/review.service.server');
commentService(app);

var userService = require('./services/user.service.server');
userService(app);

var likeService = require('./services/like.service.server');
likeService(app);

var bookmarkService = require('./services/bookmark.service.server');
bookmarkService(app);

var activityService = require('./services/activity.service.server');
activityService(app);

var movieService = require('./services/movie.service.server');
movieService(app);

var followService = require('./services/follow.service.server');
followService(app);


const PORT = process.env.PORT || 4000;
app.listen(PORT, function(){
    console.log("Our app is running on port" + PORT)
})
 // app.listen(4000);