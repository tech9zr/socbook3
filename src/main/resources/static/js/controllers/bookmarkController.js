(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$filter', 'CategoryService', 'BookmarkService', 'uibDateParser', 'TagService', 'UserService'];
   
    function BookmarkController($filter, CategoryService, BookmarkService, uibDateParser, TagService, UserService) {
        
        var vm = this;
        vm.addBookmark = addBookmark;
        vm.deleteBookmark = deleteBookmark;
        vm.editBookmark = editBookmark;
        vm.saveBookmark = saveBookmark;
        vm.selectBookmark = selectBookmark;
        vm.addTag = addTag;
        vm.deleteTag = deleteTag;
        vm.operation;

        init();

        function init() {
            vm.loggedInUser = UserService.loggedInUser();
            if(vm.loggedInUser) {
                getCategories();
                getBookmarks();
            }
            vm.bookmark = {
                creationDate: new Date()
            };
            vm.error = {};
            vm.closeModal = false;
        }

        function addBookmark() {
            vm.addBookmarkForm.$setPristine();
            vm.operation = "Add";
            init();
        }

        function selectBookmark(bookmark){
            vm.bookmark = bookmark;
        }

        function deleteBookmark(){
            BookmarkService.deleteBookmark(vm.bookmark.id).then(function(response){
            	 getBookmarks();
            });
            vm.operation = "Delete";
            vm.bookmark= {};
        }

        function editBookmark(bookmark){
        	vm.error = {};
            vm.operation = "Edit";
            vm.bookmark = angular.copy(bookmark);
        }

//        function getBookmarksByUsername(username) {
//            BookmarkService.getBookmarksByUsername(username).then(handleSuccessBookmarks) 
//        }
        
        function getCategories(){
            CategoryService.getCategories().then(handleSuccessCategories);
        }
        
        function getBookmarks(){
            BookmarkService.getBookmarks().then(handleSuccessBookmarks);
        }

        //Get all category
        function handleSuccessCategories(data, status){
            vm.categories = data;
        }
        
        //Get all bookmarks
        function handleSuccessBookmarks(data, status){
            vm.bookmarks = data.data;
        }

        function capitalize(error){
            return '* ' + error[0].toUpperCase() + error.slice(1); 
        }

        function saveBookmark(bookmark){
            if(vm.operation == "Add") {
                bookmark.creationDate = bookmark.creationDate.getTime();
                bookmark.user = vm.loggedInUser;
            }
            bookmark.tags = vm.bookmark.tags;       	
       	    saveBookmarkToDatabase(bookmark);
        }
        
        function saveBookmarkToDatabase(bookmark) {
            BookmarkService.saveBookmark(bookmark).then(function(response){
            	getBookmarks();
                $('#add-bookmark-modal').modal('hide');
            }, function(error){
                vm.error = {};
                angular.forEach(error.data.exceptions, function(e){
                    errorHandler(e);
                });
            })
            //remove input value after submit
            vm.addBookmarkForm.$setPristine();
            vm.error = {};
        }
        
        function addTag() {
        	if(!vm.bookmark.tags)
        		vm.bookmark.tags = [];
        	vm.bookmark.tags.push(vm.tag);
        	delete vm.tag;
        }

        function deleteTag(tag) {
            vm.bookmark.tags.splice(vm.bookmark.tags.indexOf(tag), 1);
        }
        
        function errorHandler(error){
            switch(error.field){
                case 'title':
                    vm.error.title = capitalize(error.message);
                    break;
            }
        }    
    };
})();