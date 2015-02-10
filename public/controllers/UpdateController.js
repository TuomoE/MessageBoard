module.controller("UpdateController",["$scope","SocketFactory","DeleteFactory",function($scope,SocketFactory,DeleteFactory) {
    
    
    $scope.update = {};
    
    DeleteFactory.getMessagesForUser().then(function(data) {
            
        $scope.update.messages = data.messages;
        $scope.update.user = data.name;
        
    });
     
}]);