var express = require('express');
var bodyParser = require('body-parser');
//These are needed for passport
var session = require('express-session');
var passport = require('passport');
module.exports.passport = passport;

//Initialize our passport
require('./app/passport')(passport); 

var db = require('./app/database');
var user = require('./app/user');
var queries = require('./app/queries');
var message = require('./app/message'); 
var app = express();
//These are needed for sockets
var server = require('http').Server(app);
var io = require('socket.io')(server);


//This middleware is called for every request
app.use(function(req,res,next){
    //Store queries object to request
    req.queries = queries;
    req.passport = passport;
    //Pass to next middleware
    next();
    
});

//Point static files to public folder
app.use('/',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({secret: 'liirumlaarum', saveUninitialized: true, resave: true,cookie: {maxAge: 12000}}));
app.use(passport.initialize());
app.use(passport.session());

//Here is my middleware
app.use('/app',user);
app.use('/message',message);

app.get('/authenticate',function(req,res){
    
    if(req.user){
        res.send({authenticated:true});
    }
    else{
        res.send({authenticated:false});
    }
});

app.get('/*',function(req,res){
    
    res.sendFile(__dirname + '/public/index.html');
});

//Server side socket waits incoming connections
io.on('connection',function(socket){
    //Wait message 'new_message'
    socket.on('new_message',function(data){
        queries.saveMessage(data);
        io.emit('broadcast_msg',data);
    });
});


server.listen(3000);