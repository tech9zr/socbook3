(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .when('/signup', {
                templateUrl: '/views/signup.html',
                controller: 'SignupController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/views/login.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .otherwise('/');
    }
}());
