(function(){
angular.module('app')
    .controller('PubController', PubController);
    
    PubController.$inject = ['$rootScope', 'BookmarkService', 'CategoryService'];
   
    function PubController($rootScope, BookmarkService, CategoryService) {
    	 var vm = this;
    	 vm.getBookmarkByUsernameAndVisible=getBookmarkByUsernameAndVisible;
    	 
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
    
};
})();