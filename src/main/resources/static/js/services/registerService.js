(function () {
    angular.module("app")
            .service('RegisterService', RegisterService);

    RegisterService.$inject = ['$http', '$q'];

    function RegisterService($http, $q) {

        this.saveUser = function (user) {
            var def = $q.defer();
            var req = {
                method: user.id ? 'PUT': 'POST',
                url: "users",
                data: user
            }
            return $http(req).success(function (response) {
                return response;
            }).error(function () {
                def.reject("Failed");
            });
            return def.promise;
        }

    };
}());