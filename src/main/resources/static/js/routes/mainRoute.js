(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/bookmark.html',
                controller: 'BookmarkController',
                controllerAs: 'vm'
            })
            .when('/categories', {
                templateUrl: '/views/categories.html',
                controller: 'CategoryController',
                controllerAs: 'vm'
            })
            .otherwise('/');
    }
}());
