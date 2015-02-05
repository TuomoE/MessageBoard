module.factory('LoginFactory',['$resource','$location',function($resource,$location){
    
    var factory = {};
    factory.userLogin = function(userData){
        var res = $resource('/app/login',{},{post:{method:'POST'}});
        res.post(userData).$promise.then(function(data){
            $location.path('/user');
        });
    }
    
    factory.userRegister = function(userData){
        return $resource('/app/register',{},{post:{method:'POST'}}).post(userData).$promise;
    }
    
    return factory;
}]);