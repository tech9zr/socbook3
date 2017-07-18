
(function () {
    angular.module("app")
            .service('UserService', UserService);

    UserService.$inject = ['$http', '$q'];

//    function userService($http, $q) {
//
//        var userList = [];
//
//        this.getuser = function () {
//            var def = $q.defer();
//            var req = {
//                method: 'GET',
//                url: "users"
//            }
//            return $http(req).success(function (response) {
//                return userList = response.data;
//            }).error(function () {
//                return def.reject("Failed to get user");
//            });
//        }
//
//        this.saveUser = function (user) {
//            var def = $q.defer();
//            var req = {
//                method: user.id ? 'PUT': 'POST',
//                url: "users",
//                data: user
//            }
//            return $http(req).success(function (response) {
//                //booksList.push(response);
//                return response;
//            }).error(function () {
//                def.reject("Failed");
//            });
//            return def.promise;
//        }
//
//        this.deleteUser = function (id) {
//            var def = $q.defer();
//            var req = {
//                method: 'DELETE',
//                url: "users/" + id
//            }
//            $http(req).success(function (data) {
//                def.resolve(data);
//            }).error(function () {
//                def.reject("Failed");
//            });
//            return def.promise;
//        }
//    };
}());