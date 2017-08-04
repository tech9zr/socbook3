(function(){
    angular.module('app')
    .controller('CategoryController', CategoryController);   
    
    CategoryController.$inject = ['CategoryService', 'BookmarkService'];
    
    function CategoryController(CategoryService, BookmarkService) {
        
        var vm = this;
        vm.addCategory = addCategory;
        vm.deleteCategory = deleteCategory;
        vm.editCategory = editCategory;
        vm.saveCategory = saveCategory;
        vm.selectCategory = selectCategory;
        vm.operation;
        
        
        //Create new category
        vm.category = {};

        getCategories();
        
        function addCategory() {
            vm.operation = "Add";
            vm.addCategoryForm;
            vm.category = {};
        }

        function deleteCategory(category){
            CategoryService.deleteCategory(vm.category.id).then(function(response){
                getCategories();
            }, function(error){
            	vm.category = category;
            	$('#categoryModal').modal('show');
            });
            vm.category = {};
        }
        
        function editCategory(category) {
            vm.operation = "Edit";
            vm.category = angular.copy(category);
        }
        
        function getCategories(){
            CategoryService.getCategories().then(handleSuccessCategory);
        }
        
        //Get all categories
        function handleSuccessCategory(data, status){
            vm.categories = data;
        }

        function saveCategory(category){
            CategoryService.saveCategory(category).then(function(response){
                getCategories();
            }, function(error){

            })
            //remove input value after submit
            vm.addCategoryForm.$setPristine();
        }
        
        function selectCategory(category){
            vm.category = category;
        }
        
        
     
    };
})();
