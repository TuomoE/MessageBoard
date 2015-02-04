var User = require('./database').User;
var Message = require('./database').Message;

//Use this for store new user for our application
module.exports.registerUser = function(req,res){
    
    var user = new User();
    user.name = req.body.username;
    user.password = user.generateHash(req.body.password);
    user.email = req.body.email;
    
    //Store model in database
    user.save(function(err){
        if(err){
            res.send({status:'Error'})
        }
        else{
            res.send({status:'Ok'});
        }
    });
}

//Called when we need to store message for user
module.exports.saveMessage = function(data){
    //Find the user by name
    User.findOne({name:data.owner},function(err,user){
        
        if(!err){
            var message = new Message();
            message.owner = user;
            message.subject = data.subject;
            message.text = data.text;
            message.timestamp = data.timestamp;
            user.messages.push(message);
            message.save();
            user.save();
        }
    });
}

module.exports.getRecentPosts = function(req,res){
    var options = {
        path:'messages',
        options:{limit:5,sort:{_id: -1}}
        //match:{'subject':'asd'}
    };
    User.findOne({name:req.query.id}).populate(options).exec(function(err,popul){
        res.send(popul);
    });
}

module.exports.getFilteredData = function(req,res){
    
    var data = JSON.parse(req.query.id);
    User.find(data.query1).populate(data.query2).exec(function(err,data){
        var temp = {
            all:data
        }
        res.send(temp);
    });
}

module.exports.getFilterNames = function(req,res){
    User.find().select('name').exec(function(err,popul){
        Message.find().select('subject').exec(function(err,mes){
            var data = {};
            data.names = popul;
            data.subjects = mes;
            res.send(data);
        });
    });
}