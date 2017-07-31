/**
 * 
 */
(function () {
    angular.module("app")
            .service('BookmarkService', BookmarkService);

    BookmarkService.$inject = ['$http', '$q'];

    function BookmarkService($http, $q) {

        var bookmarksList = [];
     
        this.getBookmark = function (id) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/" + id
            }
            $http(req).success(function (data) {
                def.resolve(data);
            }).error(function () {
                def.reject("Failed");
            });
            return def.promise;
        }

        this.getBookmarks = function () {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks"
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmark");
            });
        } 
        
        this.getBookmarksByVisible = function () {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/visible" 
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmark");
            });
        }
        
        this.getBookmarksByUsername = function (username) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/username/" + username
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmark");
            });
        }
  
        
        this.getBookmarkByUsernameAndVisible = function (username) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "bookmarks/user/" + username
            }
            return $http(req).success(function (response) {
                return bookmarksList = response.data;
            }).error(function () {
                return def.reject("Failed to get bookmark");
            });
        }
        
        this.saveBookmark = function (bookmark) {
            var def = $q.defer();
            var req = {
                method: bookmark.id ? 'PUT': 'POST',
                url: "bookmarks",
                data: bookmark
            }
            return $http(req).success(function (response) {
                //booksList.push(response);
                return response;
            }).error(function () {
                def.reject("Failed");
            });
            return def.promise;
        }

        this.deleteBookmark = function (id) {
            var def = $q.defer();
            var req = {
                method: 'DELETE',
                url: "bookmarks/" + id
            }
            $http(req).success(function (data) {
                def.resolve(data);
            }).error(function () {
                def.reject("Failed");
            });
            return def.promise;
        }
        
        this.importBookmarkFromUser = function (bookmarkId, username) {
            var def = $q.defer();
            var req = {
                method: 'POST',
                url: "bookmarks/import/bookmark/" + bookmarkId + "/username/" + username,
                data: bookmarkId, username
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