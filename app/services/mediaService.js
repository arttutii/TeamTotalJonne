angular.module("theApp")
    .service("MediaService", function ($rootScope) {

        var mediaVariables = {
            mediaUrl: "http://util.mw.metropolia.fi/uploads/",
            userData: {}
        };

        mediaVariables.setVariable = function (key, value) {
            mediaVariables[key] = value;
            $rootScope.$broadcast("mediaevent", "Variables updated");
        };

        return mediaVariables;
    });
