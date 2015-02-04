var module = angular.module('MeanStack',['ngRoute','ngResource','ngAnimate']);

module.config(function($routeProvider,$locationProvider){
    
    $locationProvider.html5Mode(true);
    $routeProvider.when('/',{
        templateUrl:'partials/login.html',
        controller:'LoginController'
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

function loginRequired($location, $q,$rootScope){
    
    var deferred = $q.defer();

    if(!$rootScope.isAuthenticated) {
        deferred.reject()
        $location.path('/');
    } else {
        deferred.resolve()
    }

    return deferred.promise;
}

