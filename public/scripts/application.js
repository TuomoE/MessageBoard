var module = angular.module('MeanStack',['ngRoute','ngResource','ngAnimate','ngCookies']);

module.config(function($routeProvider,$locationProvider){
    
    $locationProvider.html5Mode(true);
    $routeProvider.when('/',{
        templateUrl:'partials/login.html',
        controller:'LoginController',
    });
    
    $routeProvider.when('/user',{
        templateUrl:'partials/userdata.html',
        controller:'MessageController',
        resolve:{loginRequired:loginRequired}
    });
    
    $routeProvider.when('/filter',{
        templateUrl:'partials/filtermessages.html',
        controller:'FilterController',
        resolve:{loginRequired:loginRequired}
    });
    
    $routeProvider.otherwise({redirectTo: '/'});
});

function loginRequired($q,$location,$resource){
    
    var deferred = $q.defer();
        
    $resource('/authenticate').get().$promise.then(function(auth){
        
        if(auth.authenticated){
            deferred.resolve();
        }
        else{
            deferred.reject();
            $location.path('/');
        }
    });
    
    return deferred.promise;
}

