var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
    req.queries.getRecentPosts(req,res);
});

router.get('/filters',function(req,res){
    req.queries.getFilterNames(req,res);
});

router.get('/filtered',function(req,res){
    req.queries.getFilteredData(req,res);
});


module.exports = router;