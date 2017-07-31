(function(){
angular.module('app')
    .controller('AdminUserController', AdminUserController);
    
    AdminUserController.$inject = ['UserService'];
   
    function AdminUserController(UserService) {
        
        var vm = this;
        vm.addUser = addUser;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;     
        vm.saveUser = saveUser;
        vm.selectUser = selectUser;
        vm.operation;
        
        init();

        function init() {
            vm.loggedInUser = UserService.loggedInUser();
            if(vm.loggedInUser) {
            	getUsers();
            }
            vm.closeModal = false;
        }

        function addUser() {
            vm.adminAddUserForm.$setPristine();
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
        
        function saveUser(user) {
        	user.roles = [{"id":1,"type":"ROLE_USER"}];
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
            vm.adminAddUserForm.$setPristine();
        	vm.error = {};
        }

//       function saveUser(user){
//        UserService.saveUser(user).then(function(response){
//            getUsers();
//            $('#add-user-modal').modal('hide');
//        }, function(error){
//            vm.error = {};
//            angular.forEach(error.data.exceptions, function(e){
//                errorHandler(e);
//            });
//        })
//        //remove input value after submit
//        vm.adminRegisterUserForm.$setPristine();
//        vm.error = {};
//        }
        
        
        function selectUser(user){
            vm.user = user;
        }
        
        function capitalize(error){
            return '* ' + error[0].toUpperCase() + error.slice(1); 
        }
 
        function errorHandler(error){
            switch(error.field){
                case 'username':
                    vm.error.username = error.message;
                    break;
                case 'email':
                    vm.error.email = error.message;
                    break;
                    }
        
        }
        
  
        
        
  
        
        
    
    };
})();