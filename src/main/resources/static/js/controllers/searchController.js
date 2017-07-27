(function () {
    angular.module('app')
            .controller('SearchController', SearchController);

    SearchController.$inject = ['$rootScope', '$scope', 'BookmarkService', '$location' ];

    function SearchController($rootScope, $scope, BookmarkService, $location) {

        var vm = this;
        vm.isActive = isActive;
        vm.bookmarks;
        vm.getBookmarkByVisible = getBookmarkByVisible; 
        vm.clearAll = clearAll;
       
        init();

        function init() {
            getBookmarkByVisible();
            vm.user = $rootScope.user;
        }

        //nav-bar
        function isActive(viewLocation) 
        {
            return viewLocation === $location.path();
        }
        
        function getBookmarkByVisible(){
            BookmarkService.getBookmarkByVisible().then(function(response){
               vm.bookmarks=response.data;
            }, function(error){

            });
        }  
        
        function clearAll(){
        	vm.searchByCategory = "";
        	vm.searchByTag = "";
        	vm.searchByDescription = "";
        	vm.searchByUsername = "";
        }
     }

})();