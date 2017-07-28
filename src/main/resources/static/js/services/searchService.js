(function () {
    angular.module("app")
            .service('SearchService', SearchService);

    function SearchService() {

        var disabledImportBookmarks = [];

        this.getDisabledImportBookmarks = function () {
            return disabledImportBookmarks;
        }

        this.addDisabledImportBookmark = function (bookmarkId, username) {
            disabledImportBookmarks.push({"bookmarkId":bookmarkId, "username":username});
        }
    };
}());