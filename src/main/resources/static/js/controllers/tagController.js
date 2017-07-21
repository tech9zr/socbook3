(function(){
    angular.module('app')
    .controller('TagController', TagController);   
    
    TagController.$inject = ['TagService'];
    
    function TagController(TagService) {
        
        var vm = this;
        vm.addTag = addTag;
        vm.deleteTag = deleteTag;
        vm.editTag = editTag;
        vm.saveTag = saveTag;
        vm.selectTag = selectTag;
        vm.operation;
        
        //Create new Tag
        vm.tag = {};

        getTags();
        
        function addTag() {
            vm.operation = "Add";
            vm.addTagForm;
            vm.tag = {};
        }

        function deleteTag(){
            TagService.deleteTag(vm.tag.id).then(function(response){
                getTags();
            }, function(error){

            });
            vm.tag = {};
        }
        
        function editTag(tag) {
            vm.operation = "Edit";
            vm.tag = angular.copy(tag);
        }
        
        function getTags(){
            TagService.getTags().then(handleSuccessTag);
        }
        
        //Get all Tags
        function handleSuccessTag(data, status){
            vm.tags = data;
        }

        function saveTag(Tag){
            TagService.saveTag(tag).then(function(response){
                getTags();
            }, function(error){

            })
            //remove input value after submit
            vm.addTagForm.$setPristine();
        }
        
        function selectTag(tag){
            vm.tag = tag;
        }
    };
})();
