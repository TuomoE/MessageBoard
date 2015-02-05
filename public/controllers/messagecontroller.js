module.controller('MessageController',['$scope','$rootScope','$location','SocketFactory','LoginFactory',function($scope,$rootScope,$location,SocketFactory,LoginFactory){
    
    $scope.message = {};
    $scope.message.messages = [];
    $scope.message.isVisible = false;
    SocketFactory.getRecentPosts().then(function(data){
        $scope.message.messages = data.messages;
        $scope.message.user = data.name;
    });
    
    $scope.message.new = function(){
       $scope.message.subject = "";
       $scope.message.text = "";
       $scope.message.isVisible = $scope.message.isVisible ? false:true;
    }
    
    $scope.message.showAll = function(){
        $location.path('/filter');
    }
    
    $scope.message.send = function(){
        var message = {};
        message.owner = $scope.message.user;
        message.subject = $scope.message.subject;
        message.text = $scope.message.text;
        message.timestamp = new Date();
        
        SocketFactory.sendMessage(message);
        $scope.message.subject = "";
        $scope.message.text = "";
    }
    //Will be called when server send socket response
    SocketFactory.notify = function(data){
        $scope.message.messages.push(data);
        $scope.$apply();
    };
    
}]);