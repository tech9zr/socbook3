(function () {
    angular.module('app')
            .controller('SearchController', SearchController);

    SearchController.$inject = ['$location', 'BookmarkService', 'UserService', 'SearchService'];

    function SearchController($location, BookmarkService, UserService, SearchService) {

        var vm = this;
        vm.isActive = isActive;
        vm.importBookmark = importBookmark;
        vm.isImportDisabled = isImportDisabled;
        vm.detailsBookmark = detailsBookmark;
        vm.closeDetailsBookmark = closeDetailsBookmark;
        vm.clearAll = clearAll;
        vm.bookmarks;

        init();

        function init() {
        	vm.loggedInUser = UserService.loggedInUser();
	        if(vm.loggedInUser) {
	            getBookmarkByVisible();
	        }
        }

        //nav-bar
        function isActive(viewLocation) 
        {
            return viewLocation === $location.path();
        }
        
        function getBookmarkByVisible(){
            BookmarkService.getBookmarkByVisible().then(handleSuccessBookmarks)
        }  

        function handleSuccessBookmarks(data, status){
            vm.bookmarks = data.data;
        }
        
        function clearAll(){
        	vm.searchByCategory = "";
        	vm.searchByTag = "";
        	vm.searchByDescription = "";
        	vm.searchByUsername = "";
        }
        
        function importBookmark(bookmark){
            BookmarkService.importBookmarkFromUser(bookmark.id, vm.loggedInUser.username);
            SearchService.addDisabledImportBookmark(bookmark.id, vm.loggedInUser.username);
        }

        function isImportDisabled(bookmark){
            return SearchService.getDisabledImportBookmarks().some(function(val){
                return val.bookmarkId === bookmark.id && val.username === vm.loggedInUser.username;
            });
        }

        function detailsBookmark(bookmark) {
            vm.bookmark = bookmark;
        }

        function closeDetailsBookmark() {
            vm.bookmark = {};
        }
     }

})();