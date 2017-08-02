(function () {
    angular.module('app')
            .controller('MainController', MainController);

    MainController.$inject = ['$location', '$http', '$route', 'UserService', 'vcRecaptchaService'];

    function MainController($location, $http, $route, UserService, vcRecaptchaService) {

        var self = this;
        self.isActive = isActive;
        self.register = register;
        self.login = login;
        self.logout = logout;
        self.toggleLoginRegister = "login";
        self.user;
        self.loginError;
        self.registrationError;
        self.captchaMessage;
        self.selectedTheme = "/superhero";
        
        //reCaptcha
        self.publicKey = "6LdBOCsUAAAAAApZH8xQDF78JM5e-4bFMdY1LYaK";     

        
        
        
        
        init();

        function init() {
            if (self.user) {
                $route.reload();
            }
        }        

        //nav-bar
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

        function register(user) {
            if(vcRecaptchaService.getResponse() === ""){ //if string is empty
                self.captchaMessage = "Please resolve the captcha and submit!"
                $('#captchaModal').modal('show');
            } else {
                var data = {
                    'g-recaptcha-response': vcRecaptchaService.getResponse()  //send g-captcah-reponse to our server        
                }
                UserService.sendCaptcha(data).then(function(response){
                    console.log(response.data);
                    if(response.data.success){
                        saveUser(user);
                        self.captchaMessage = user.username + " is registered!";
                        $('#captchaModal').modal('show');
                    }
                    else{
                        self.captchaMessage = "You are a robot!";
                        $('#captchaModal').modal('show');
                    }
                }, function(error) {
                    self.captchaMessage = "User registration failed!";
                    $('#captchaModal').modal('show');
                })
            }
        }

        function saveUser(user){
            user.status = true;
        	user.roles = [{"id":1,"type":"ROLE_USER"}];
        	UserService.saveUser(user).then(function(response){
        	//self.toggleLoginRegister = "login";
            }, function(error){
            	self.registrationError = {};
                angular.forEach(error.data.exceptions, function(e){
                    errorHandler(e);
                });
            })
            //remove input value after submit
            self.registerUserForm.$setPristine();
        }

        function login() {
            // creating base64 encoded String from username and password
            var base64Credential = btoa(self.credentials.username + ':' + self.credentials.password);

            // calling GET request for getting the user details
            $http.get('users/user', {
                headers: {
                    // setting the Authorization Header
                    'Authorization': 'Basic ' + base64Credential
                }
            }).success(function (res) {
                self.credentials.password = null;
                self.message = '';
                // setting the same header value for all request calling from this app
                $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
                self.user = res;                
                UserService.getLoggedInUserByUsername(self.user.username).then(function(response){
                	if(!response.data.status)
                		logout();
                	else
                		init();
                });
            }).error(function (error) {
                self.loginError = 'Bad credentials!';
            });
        }

        // method for logout
        function logout() {
            // clearing the authorization header
            $http.defaults.headers.common['Authorization'] = null;
            // clearing all data
            delete self.user;
            delete self.error;
        }
        
        function errorHandler(error){
            switch(error.field){
                case 'username':
                    self.registrationError.username = error.message;
                    break;
                case 'email':
                    self.registrationError.email = error.message;
                    break;
            }
        }
        
    }

})();
