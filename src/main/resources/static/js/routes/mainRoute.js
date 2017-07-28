(function () {
    angular.module('app')
            .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/bookmarks.html',
                controller: 'BookmarkController',
                controllerAs: 'vm'
            })
            .when('/search', {
                templateUrl: '/views/search.html',
                controller: 'SearchController',
                controllerAs: 'vm'
            })
            .when('/adminCategories', {
                templateUrl: '/views/adminCategories.html',
                controller: 'CategoryController',
                controllerAs: 'vm'
            })
            .when('/adminBookmarks', {
                templateUrl: '/views/adminBookmarks.html',
                controller: 'AdminBookmarksController',
                controllerAs: 'vm'
            })
            .when('/adminUsers', {
                templateUrl: '/views/adminUser.html',
                controller: 'UserController',
                controllerAs: 'vm'
            })
//          .when('/home', {
//	            templateUrl: '/views/home.html',
//	            controller: 'HomeController',
//	            controllerAs: 'vm'
//	        })
//	        .when('/pub/:username', {
//                templateUrl: '/views/pub.html',
//                controller: 'PubController',
//                controllerAs: 'vm'
//            })
            .otherwise('/');
    }
}());
