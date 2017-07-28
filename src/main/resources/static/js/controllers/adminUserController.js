(function(){
angular.module('app')
    .controller('AdminUserController', AdminUserController);
    
    AdminUserController.$inject = ['UserService', 'RegisterService'];
   
    function AdminUserController(UserService, RegisterService) {
        
        var vm = this;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;     
        vm.saveUser = saveUser;
        vm.selectUser = selectUser;
        vm.register=register;
        vm.operation;
        
        vm.registerInput = {};
        init();

        function init() {
            getUsers();
            vm.user={};
            vm.error = {};   
            vm.closeModal = false;
        }

        function register(user) {
        	user.roles = [{"id":1,"type":"ROLE_USER"}];
        	console.log(user);
        	RegisterService.saveUser(user).then(function(response){
        		getUsers();
            }, function(error){
            	vm.registrationError = {};
                angular.forEach(error.data.exceptions, function(e){
                    errorHandler(e);
                });
            })
           
            vm.adminRegisterUserForm.$setPristine();
        }

        function addUser() {
            vm.adminRegisterUserForm.$setPristine();
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
        	vm.user = user;
        	vm.error = {};
            vm.operation = "Edit";
            vm.user = angular.copy(user);
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
            vm.adminRegisterUserForm.$setPristine();
            vm.error = {};
        }
        
        
        function selectUser(user){
            vm.user = user;
        }
        
        function capitalize(error){
            return '* ' + error[0].toUpperCase() + error.slice(1); 
        }
 
        function errorHandler(error){
            switch(error.field){
                case 'username':
                    vm.registrationError.username = error.message;
                    break;
                case 'email':
                    vm.registrationError.email = error.message;
                    break;
                    }
        
        }
        
  
        
        
  
        
        
    
    };
})();