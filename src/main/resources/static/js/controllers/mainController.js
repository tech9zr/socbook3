(function () {
    angular.module('app')
            .controller('MainController', MainController);

    MainController.$inject = ['$location', '$http', '$route'];

    function MainController($location, $http, $route) {

        var self = this;


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


    }

})();
