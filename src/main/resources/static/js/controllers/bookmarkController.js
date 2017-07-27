(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$rootScope', '$filter', 'CategoryService', 'BookmarkService', 'uibDateParser', 'TagService', 'UserService'];
   
    function BookmarkController($rootScope, $filter, CategoryService, BookmarkService, uibDateParser, TagService, UserService) {
        
        var vm = this;
        vm.addBookmark = addBookmark;
        vm.deleteBookmark = deleteBookmark;
        vm.editBookmark = editBookmark;
        vm.openCalendar = openCalendar;
        vm.saveBookmark = saveBookmark;
        vm.selectBookmark = selectBookmark;
        vm.addTag = addTag;
        vm.operation;
        vm.getBookmarkByUsername=getBookmarkByUsername; 
        vm.user;
       

        init();

        function init() {
            getCategories();
            getBookmarkByUsername($rootScope.user.username);
            vm.error = {};
            //Create new book
            vm.bookmark = {
                creationDate: new Date()
            };
            vm.closeModal = false;
        }

        vm.datePickerOptions = {
            formatYear: 'yy',
            maxDate : new Date()
        };

        vm.popupCalendar = {
           opened: false
        }; 

        function addBookmark() {
            vm.addBookmarkForm.$setPristine();
            vm.operation = "Add";
            init();
        }

        function deleteBookmark(){
            BookmarkService.deleteBookmark(vm.bookmark.id).then(function(response){
            	 getBookmarkByUsername($rootScope.user.username);
            }, function(error){

            });
            vm.operation = "Delete";
            vm.bookmark= {};
        }

        function editBookmark(bookmark){
        	vm.error = {};
            vm.operation = "Edit";
            vm.bookmark = angular.copy(bookmark);
            //vm.bookmark.creationDate = new Date(vm.bookmark.creationDate.split('-').join(' '));
        }

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
        
        //Get all books
        function handleSuccessBookmarks(data, status){
            vm.bookmarks = data.data;
        }

        function openCalendar() {
            vm.popupCalendar.opened = true;
        };

        function capitalize(error){
            return '* ' + error[0].toUpperCase() + error.slice(1); 
        }

        function saveBookmark(bookmark){
        	if(vm.operation == "Add")
        		bookmark.creationDate = bookmark.creationDate.getTime();
        	bookmark.user = $rootScope.user;
        	if(typeof vm.newTags !== "undefined") {
                if(typeof bookmark.tags === "undefined")
                    bookmark.tags = [];
        	bookmark.tags = bookmark.tags.concat(vm.newTags);
        	console.log(bookmark);
        	}
        	
        	saveBookmarkToDatabase(bookmark);
        }
        
        function saveBookmarkToDatabase(bookmark) {
            BookmarkService.saveBookmark(bookmark).then(function(response){
            	getBookmarkByUsername($rootScope.user.username);
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
        	if(typeof vm.newTags === "undefined")
        		vm.newTags = [];
        	vm.newTags.push({"name":vm.tag.name});
        	delete vm.tag;
        }
        
        function selectBookmark(bookmark){
            vm.bookmark = bookmark;
        }
        
        function errorHandler(error){
            switch(error.field){
                case 'title':
                    vm.error.title = capitalize(error.message);
                    break;
                case 'isbn':
                    vm.error.isbn = capitalize(error.message);
                    break;
            }
        }
        
        
        function getBookmarkByUsername(username)
        {
            BookmarkService.getBookmarkByUsername(username).then(function(response)
           {
               vm.bookmarks=response.data;
            }, function(error){

            });
        }
        
        
    
    };
})();