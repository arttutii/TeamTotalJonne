angular.module("theApp")
    .factory("AjaxFactory", function ($http, $httpParamSerializer) {
        var urlBase = "http://util.mw.metropolia.fi/ImageRekt/api/v2/";
        var ajaxFunctions = {};

        ajaxFunctions.uploadFile = function (args) {
            return $http.post(urlBase + "upload", args, {
                transformRequest: angular.identity,
                headers: {
                    "Content-Type": undefined
                }
            });
        };

        ajaxFunctions.register = function (args) {
            return $http.post(urlBase + "register", $httpParamSerializer(args), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        };

        ajaxFunctions.login = function (args) {
            return $http.post(urlBase + "login", $httpParamSerializer(args), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        };

        ajaxFunctions.getFile = function (args) {
            return $http.get(urlBase + "file/" + args);
        };

        ajaxFunctions.fileByUser = function (args) {
            return $http.get(urlBase + "files/user/" + args);
        };

        ajaxFunctions.userExists = function (args) {
            return $http.post(urlBase + "user/exists", args);
        };

        ajaxFunctions.logIn = function (args) {
            return $http.post(urlBase + "login", $httpParamSerializer(args), {
                headers: {
                    'Content-Type': "application/x-wwwform-urlencoded"
                }
            });
        };

        ajaxFunctions.getUserById = function (args) {
            return $http.get(urlBase + "user/" + args);
        };

        return ajaxFunctions;
    });
