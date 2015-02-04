module.controller('LoginController',['$scope','$location','$rootScope','LoginFactory',function($scope,$location,$rootScope,LoginFactory){
    
    $('#myAlert').hide();
    $scope.user = {};
    $scope.user.showError = false;
    //This is called when login button is pressed
    $scope.user.login = function(){
        //Check the form data validity
        if(!$scope.loginForm.$valid){
            $('#myAlert').show(); 
            return;
        }
        var userData = {};
        userData.username = $scope.user.username;
        userData.password = $scope.user.password;
        
        //This will start login procedure
        LoginFactory.userLogin(userData);
    }
    
    //This is called when register button is pressed
    $scope.user.register = function(){
        
        if(!$scope.loginForm.$valid){
           $('#myAlert').show(); 
            return;
        }
        var userData = {};
        userData.username = $scope.user.username;
        userData.password = $scope.user.password;
        userData.email = $scope.user.email;
        
        LoginFactory.userRegister(userData).then(function(data){
            
            if(data.status === 'Error'){
                $scope.user.showError = true;
            }
            else{
                $scope.user.showError = false;
                $scope.user.email = "";
            }
        });
    }
    
}]);