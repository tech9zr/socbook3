(function(){
angular.module('app')
    .controller('UserController', UserController);
    
    UserController.$inject = ['UserService'];
   
    function UserController(UserService) {
        
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.editUser = editUser;
        vm.selectUser = selectUser;
        vm.user;
       

        init();

        function init() {
             getUsers();
            vm.closeModal = false;
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
           
        }
  
        function getUsers(){
            UserService.getUsers().then(handleSuccessUsers);
        }
    
        function handleSuccessUsers(data, status){
            vm.users = data.data;
        }    
        
        function selectUser(user){
            vm.user = user;
        }
        
   
        

        
        
    
    };
})();