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
        vm.postComment = postComment;
        vm.deleteComment = deleteComment;
        vm.bookmarks;

        init();

        function init() {
        	vm.loggedInUser = UserService.loggedInUser();
	        if(vm.loggedInUser) {
	            getBookmarksByVisible();
	        }
        }

        //nav-bar
        function isActive(viewLocation) 
        {
            return viewLocation === $location.path();
        }
        
        function getBookmarksByVisible(){
            BookmarkService.getBookmarksByVisible().then(handleSuccessBookmarks)
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
            BookmarkService.importBookmarkFromUser(bookmark.id, vm.loggedInUser.username).then(function(){
                getBookmarksByVisible();
            });
            //SearchService.addDisabledImportBookmark(bookmark.id, vm.loggedInUser.username);
        }

        function isImportDisabled(bookmark){
            if(bookmark.importedUsersList.length > 0)
                return bookmark.importedUsersList.some(function(val){
                    return vm.loggedInUser.username === val;
                })
            return false;
            // return SearchService.getDisabledImportBookmarks().some(function(val){
            //     return val.bookmarkId === bookmark.id && val.username === vm.loggedInUser.username;
            // });
        }

        function detailsBookmark(bookmark) {
            vm.bookmark = bookmark;
        }

        function closeDetailsBookmark() {
            vm.bookmark = {};
        }

        function postComment(comment) {
            var bookmark = angular.copy(vm.bookmark);
            bookmark.comments = [];
            bookmark.comments.push({content:comment.content, rate:comment.rate, author:vm.loggedInUser, creationDate:(new Date()).getTime()});
            BookmarkService.saveBookmark(bookmark).then(function(){
                BookmarkService.getBookmark(bookmark.id).then(function(response){
                    vm.bookmark = response;
                    getBookmarksByVisible();
                });
            });
            delete vm.comment;
        }
        
        function deleteComment(comment) {
        }
     }

})();