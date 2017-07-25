(function () {
    angular.module("app")
        .factory('SharedService', SharedService);

    SharedService.$inject = ['$rootScope'];
    
    function SharedService($rootScope) {

    	SharedService.message = '';
    	
    	SharedService.prepForBroadcast = function(msg) {
    		this.message = msg;
    		this.broadcastItem();
    	};
    	
    	SharedService.broadcastItem = function() {
    		$rootScope.$broadcast('handleBroadcast');
    	};
    	
    	return SharedService;
        
    }
} ());
