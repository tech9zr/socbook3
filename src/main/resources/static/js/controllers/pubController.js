(function(){
angular.module('app')
    .controller('PubController', PubController);
    
    PubController.$inject = ['$rootScope', 'BookmarkService', 'CategoryService', 'UserService'];
   
    function PubController($rootScope, BookmarkService, CategoryService, UserService) {
    	 var vm = this;
    	 vm.getBookmarkByUsernameAndVisible=getBookmarkByUsernameAndVisible;
    	 vm.importBookmark = importBookmark;
    	 
    	 init();
    	 
         function init() {
        	 getCategories();
        	 getBookmarkByUsernameAndVisible($rootScope.user.username)
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
                 console.log(bookmark);
			 });
         }
    
};
})();