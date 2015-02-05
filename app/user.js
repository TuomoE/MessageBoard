var express = require('express');
var passport = require('../server').passport;
var router = express.Router();


router.post('/login', passport.authenticate('local-login'),function(req,res){
    res.send({name:req.user.name});
});

router.post('/register',function(req,res){
    req.queries.registerUser(req,res);
});

 router.get('/logout', function(req, res) {
    console.log('logging out');
    req.logOut();
    console.log(req.user); 
    res.redirect('/');
});


module.exports = router;