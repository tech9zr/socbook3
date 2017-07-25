(function(){
angular.module('app')
    .controller('PubController', PubController);
    
    PubController.$inject = ['$rootScope', '$scope', 'BookmarkService', 'CategoryService', 'UserService','SharedService', '$routeParams'];
   
    function PubController($rootScope, $scope, BookmarkService, CategoryService, UserService, SharedService, $routeParams) {
    	 var vm = this;
    	 vm.getBookmarkByUsernameAndVisible=getBookmarkByUsernameAndVisible;
    	 vm.importBookmark = importBookmark;
    	 
    	 init();
    	 
         function init() {
        	 getCategories();
        	 getBookmarkByUsernameAndVisible($routeParams.username);
         }
         function getCategories(){
             CategoryService.getCategories().then(handleSuccessCategories);
         }
         
         function handleSuccessCategories(data, status){
             vm.categories = data;
         }
         function getBookmarks(){
             BookmarkService.getBookmarks().then(handleSuccessBookmarks);
         }
         
         function handleSuccessBookmarks(data, status){
             vm.bookmarks = data.data;
         }

         function getBookmarkByUsernameAndVisible(username)
         {
             BookmarkService.getBookmarkByUsernameAndVisible(username).then(function(response)
            {
                vm.bookmarks=response.data;
             }, function(error){

             });
         }
         
         function importBookmark(bookmark){
        	 UserService.getUserByUsername($rootScope.user.username).then(function(response) {
        		 bookmark.user = response.data;
        		 delete bookmark.id;
                 BookmarkService.saveBookmark(bookmark);
			 });
         }
         
         $rootScope.$on('usernameClick', function(event, data) {
         	console.log("Radi pub: " + data + " " + event);
         	getBookmarkByUsernameAndVisible(SharedService.message);
         });
         
         
    
};
})();