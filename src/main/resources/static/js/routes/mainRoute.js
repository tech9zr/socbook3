(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
	        .when('/home', {
	            templateUrl: '/views/home.html',
	            controller: 'HomeController',
	            controllerAs: 'vm'
	        })
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
               .when('/pub/:username', {
                templateUrl: '/views/pub.html',
                controller: 'PubController',
                controllerAs: 'vm'
            })
                 .when('/adminBookmarks', {
                templateUrl: '/views/adminBookmarks.html',
                controller: 'AdminBookmarksController',
                controllerAs: 'vm'
            })
                    .when('/users', {
                templateUrl: '/views/user.html',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .when('/search', {
                templateUrl: '/views/search.html',
                controller: 'SearchController',
                controllerAs: 'vm'
            })
         
            .otherwise('/');
    }
}());
