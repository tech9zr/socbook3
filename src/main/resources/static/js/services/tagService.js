(function () {
    angular.module("app")
            .service('TagService', TagService);

    TagService.$inject = ['$http', '$q'];

    function TagService($http, $q) {

        var tagsList = [];

        this.getTags = function () {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "tags"
            }
            return $http(req).success(function (response) {
                return tagsList = response.data;
            }).error(function () {
                return def.reject("Failed to get tags");
            });
        }

        this.saveTag = function (tag) {
            var def = $q.defer();
            var req = {
                method: tag.id ? 'PUT': 'POST',
                url: "tags",
                data: tag
            }
            return $http(req).success(function (data) {
                def.resolve(data);
            }).error(function () {
                def.reject("Failed");
            });
            return def.promise;
        }

        this.deleteTag = function (id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "tags/" + id
            }
            $http(req).success(function (data) {
                def.resolve(data);
            }).error(function () {
                def.reject("Failed");
            });
            return def.promise;
        }
    };
}());