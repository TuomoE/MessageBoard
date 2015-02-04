module.factory('LoginFactory',['$resource','$rootScope','$location',function($resource,$rootScope,$location){
    
    var factory = {};
    
    factory.userLogin = function(userData){
        
        var res = $resource('/app/login',{},{post:{method:'POST'}});
        res.post(userData).$promise.then(function(){
            
            factory.userName = userData.username;
            $rootScope.isAuthenticated = true;
            $location.path('/user');
        });
    }
    
    factory.userRegister = function(userData){
        return $resource('/app/register',{},{post:{method:'POST'}}).post(userData).$promise;
    }
    
    return factory;
}]);