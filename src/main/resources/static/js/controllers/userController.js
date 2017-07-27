(function(){
angular.module('app')
    .controller('UserController', UserController);
    
    UserController.$inject = ['UserService'];
   
    function UserController(UserService) {
        
        var vm = this;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;     
        vm.saveUser = saveUser;
        vm.selectUser = selectUser;
        vm.operation;

        init();

        function init() {
            getUsers();
            vm.closeModal = false;
        }


        function addUser() {
            vm.addUserForm.$setPristine();
            vm.operation = "Add";
            init();
        }

        function deleteUser(){
            UserService.deleteUser(vm.user.id).then(function(response){
            	 getUsers();
            }, function(error){

            });
            vm.user= {};
        }

        function editUser(user){
        	vm.error = {};
            vm.operation = "Edit";
            vm.user = angular.copy(user);
            //vm.bookmark.creationDate = new Date(vm.bookmark.creationDate.split('-').join(' '));
        }

    
        function getUsers(){
            UserService.getUsers().then(handleSuccessUsers);
        }

  
        function handleSuccessUsers(data, status){
            vm.users = data.data;
        }

           function saveUser(user){
            UserService.saveUser(user).then(function(response){
                getUsers();
                $('#add-user-modal').modal('hide');
            }, function(error){
                vm.error = {};
                angular.forEach(error.data.exceptions, function(e){
                    errorHandler(e);
                });
            })
            //remove input value after submit
            vm.addUserForm.$setPristine();
            vm.error = {};
        }
        
        
        function selectUser(user){
            vm.user = user;
        }
        
  
        
        
  
        
        
    
    };
})();