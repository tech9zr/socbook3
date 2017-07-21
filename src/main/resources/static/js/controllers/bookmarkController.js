(function(){
angular.module('app')
    .controller('BookmarkController', BookmarkController);
    
    BookmarkController.$inject = ['$filter', 'CategoryService', 'BookmarkService', 'uibDateParser', 'TagService'];
   
    function BookmarkController($filter, CategoryService, BookmarkService, TagService, uibDateParser) {
        
        var vm = this;
        vm.addBookmark = addBookmark;
        vm.deleteBookmark = deleteBookmark;
        vm.editBookmark = editBookmark;
        vm.openCalendar = openCalendar;
        vm.saveBookmark = saveBookmark;
        vm.selectBookmark = selectBookmark;
        vm.addTag = addTag;
        vm.operation;
        

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
            vm.bookmark.creationDate = new Date(vm.bookmark.creationDate.split('-').join(' '));
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
            bookmark.creationDate = $filter('date')(bookmark.creationDate, "yyyy-MM-dd");
            console.log(vm.bookmark.tags);
            
            //Add new tags
            
            angular.forEach(vm.bookmark.tags, function(tag){
            	if("undefined" === typeof tag.id)
            		TagService.saveTag(tag).then(function(response){

                    }, function(error){

                    });
            });
            		
            var tag = bookmark.tags;
            bookmark.tags = {"name":tag};
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
        	console.log(vm.bookmark.tag.name)
        	if("undefined" === typeof vm.bookmark.tags)
        		vm.bookmark.tags = [];
        	vm.bookmark.tags.push({"name":vm.bookmark.tag.name});
        	console.log(vm.bookmark.tags);
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
    };
})();