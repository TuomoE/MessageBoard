module.factory('SocketFactory',['$resource',function($resource){
    
    var factory={};
    
    factory.getRecentPosts = function(user){
        return $resource('/message/',{id:user}).get().$promise;
    }
    
    //Create client socket
    var socket = io();
    
    factory.notify;
    
    //This will tirgger when server broadcasts message
    //broadcast_msg
    socket.on('broadcast_msg',function(data){
        
        factory.notify(data);
    });
    
    factory.sendMessage = function(data){
        
        socket.emit('new_message',data);
    }
    
    return factory;
}]);