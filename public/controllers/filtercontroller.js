module.controller('FilterController',['$scope','FilterFactory',function($scope,FilterFactory){
    
    $scope.filter = {};
    
    FilterFactory.getFilterData().then(function(data){
        $scope.filter.names = data.names;
        $scope.filter.subjects = data.subjects;
    });
    
    //Handle selection of name
    $('.dropdown-menu li > a').click(function(e){
        console.log(this.innerHTML);
    });
    
    //Handle selection of topic
    $('.dropdown-menu2 li > a').click(function(e){
        console.log(this.innerHTML);
    })
    
    $scope.filter.getResults = function(){
      
        var queryObject = {};
        
        if($scope.filter.s_name !== undefined){
            queryObject.query1 = {name:$scope.filter.s_name};
        }
        else{
            queryObject.query1 = {};
        }
        if($scope.filter.s_subject !== undefined){
            queryObject.query2 = {path:'messages',match:{subject:$scope.filter.s_subject}};
        }
        else{
           queryObject.query2 = {path:'messages'}; 
        }
        
        FilterFactory.getFilteredData(queryObject).then(function(data){
            console.log(data);
        });
    }
    
}]);