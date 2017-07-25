(function () {
    angular.module('app')
            .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope','CategoryService', 'BookmarkService', '$location', '$http'];

    function HomeController($rootScope, CategoryService, BookmarkService, $location) {

        var vm = this;
        vm.isActive = isActive;
        vm.categories;
        vm.bookmarks;
        vm.getBookmarkByVisible= getBookmarkByVisible;
       
        init();

        function init() {
            getCategories();
            getBookmarkByVisible();
            
        }

        function getCategories() {
            CategoryService.getCategories().then(handleSuccessCategories);
        }

        function getBookmarks() {
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }

        //Get all category
        function handleSuccessCategories(data, status)
        {
            vm.categories = data;
        }

        //Get all books
        function handleSuccessBookmarks(data, status)
        {
            vm.bookmarks = data.data;
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

        
     
        }

})();