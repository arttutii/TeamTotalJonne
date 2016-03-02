'use strict';

angular.module('theApp')
    .controller('ContentController', function ($scope, $rootScope, $uibModal, $http, $log, $sce, $window) {
        // api url
        $scope.apiurl = "http://util.mw.metropolia.fi/ImageRekt/api/v2/";
        // api media folder
        var mediaurl = 'http://util.mw.metropolia.fi/uploads/';
        // variable to use in counting mediaitems, how many to show at once
        $scope.moreMediaitems = 48;
        // array for having the usernames of media uploaders at hand
        $scope.users = [];
        // array for mediaitems to show on site
        $scope.mediaitems = [];
        // object variable for selecting a single mediaitem
        $scope.mediaitem = {};
        // object variable for selecting a single user
        $scope.user = {};
        // boolean for detecting that the document hasn't flown over the viewport window
        $scope.hasRoom = true;
        // function to make video elements show
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };


        if (localStorage.getItem("userID") !== null) {
            $scope.userLogged = true;
        } else {
            $scope.userLogged = false;
        }

        // function to show about page
        $scope.aboutPage = function () {

            $('#contentsrow').hide();
            $('.about').show();
            $('#hamburger').click();

        };

        $scope.showMediaitems = function () {

            $('#contentsrow').show();
            $('.about').hide();

            $http({
                method: 'GET',
                url: $scope.apiurl.concat("files/"),
            }).then(function successCallback(response) {

                $scope.mediaitems = response.data;

                /* parse source and thumbnail paths */
                for (var i in $scope.mediaitems) {
                    if ($scope.mediaitems[i].type !== "video") {
                        $scope.mediaitems[i].thumbNails.small = mediaurl.concat("thumbs/", "tn160_", $scope.mediaitems[i].path);
                        $scope.mediaitems[i].thumbNails.medium = mediaurl.concat("thumbs/", "tn320_", $scope.mediaitems[i].path);
                        $scope.mediaitems[i].thumbNails.large = mediaurl.concat("thumbs/", "tn640_", $scope.mediaitems[i].path);
                        $scope.mediaitems[i].path = mediaurl.concat($scope.mediaitems[i].path);
                    } else {
                        $scope.mediaitems[i].thumbNails.small = mediaurl.concat("thumbs/", "tn160_", $scope.mediaitems[i].path, ".png");
                        $scope.mediaitems[i].thumbNails.medium = mediaurl.concat("thumbs/", "tn320_", $scope.mediaitems[i].path, ".png");
                        $scope.mediaitems[i].thumbNails.large = mediaurl.concat("thumbs/", "tn640_", $scope.mediaitems[i].path, ".png");
                        $scope.mediaitems[i].path = mediaurl.concat($scope.mediaitems[i].path);
                    }
                }

            }, function errorCallback(response) {
                $log.info(response.data);
            });

        };

        $scope.showMore = function () {
            $scope.moreMediaitems += 4;
        };

        $scope.showTen = function () {
            location.reload(true);
            window.scrollTo(0, 0);
            $scope.moreMediaitems = 10;
        };

        $scope.userLogout = function () {
            localStorage.clear();
            location.reload();
        };

        $scope.uploadModal = function () {
            $("#uploadModal").modal();
        };

        $scope.loginModal = function () {
            $("#loginModal").modal();
        };

        // function to call showmediaitems in the DOM ready
        $.getMediaitems = function () {
            $scope.showMediaitems();
        };

        $.getUsers = function () {

            $http({
                method: 'GET',
                url: $scope.apiurl.concat("users/")
            }).then(function successCallback(response) {
                $scope.users = response.data;
            }, function errorCallback(response) {
                $log.info(response.data);
            });

        };

        /* function for instantiating modal displays */
        $scope.showModal = function (item) {
            $log.info(item);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/mediaitemModal.html',
                controller: 'ModalInstanceController',
                size: 'lg',
                resolve: {
                    mediaitems: function () {
                        return $scope.mediaitems;
                    },
                    item: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $scope.loadRow = function () {
            $log.info('load');
        };

    });
