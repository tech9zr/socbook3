(function(){
angular.module('app')
    .controller('AdminBookmarksController', AdminBookmarksController);
    
    AdminBookmarksController.$inject = ['$rootScope', '$filter', 'CategoryService', 'BookmarkService', 'uibDateParser', 'TagService', 'UserService'];
   
    function AdminBookmarksController($rootScope, $filter, CategoryService, BookmarkService, uibDateParser, TagService, UserService) {
        
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
            getBookmarks();
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
                getBookmarks();
            }, function(error){

            });
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
            //bookmark.creationDate = $filter('date')(bookmark.creationDate, "yyyy-MM-dd");  
            if(typeof bookmark.id === "undefined") {
                addUserToBookmark(bookmark);
            }
            else {
                addTagsToBookmark(bookmark);
            }
        }
        
        function addUserToBookmark(bookmark) {
            bookmark.creationDate = bookmark.creationDate.getTime();
            UserService.getUserByUsername($rootScope.user.username).then(function(response){
                bookmark.user = response.data;
                addTagsToBookmark(bookmark);
            }, function(error){

            });
        }
        
        function addTagsToBookmark(bookmark) {
            if(typeof vm.newTags !== "undefined") {
                if(typeof bookmark.tags === "undefined")
                    bookmark.tags = [];

                angular.forEach(vm.newTags, function(tag){
                    TagService.saveTag(tag).then(function(response){
                        bookmark.tags.push(response.data);
                        saveBookmarkToDatabase(bookmark);
                    }, function(error){

                    });
                });
                delete vm.newTags;
            }
            else {
                saveBookmarkToDatabase(bookmark);
            }
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
       