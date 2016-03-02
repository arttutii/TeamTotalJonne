'use strict';

angular.module('theApp')
    .controller('ContentController', function ($scope, $rootScope, $uibModal, $http, $log, $sce, $window) {
        // api url
        $scope.apiurl = "http://util.mw.metropolia.fi/ImageRekt/api/v2/";
        // media folder
        var mediaurl = 'http://util.mw.metropolia.fi/uploads/';
        // variable to use in counting mediaitems, how many to show at once
        $scope.moreMediaitems = 10;
        // array for having the usernames of media uploaders at hand
        $scope.users = [];
        // array for mediaitems to show on site
        $scope.mediaitems = [];
        $scope.mediaitem = {};
        // gallery size to show on site
        $scope.gallerySize = 0;

        $scope.user = {};

        $scope.gallery = [];

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
            $('#aboutrow').show();
            $('#hamburger').click();

        };

        $scope.showMediaitems = function () {

            $('#contentsrow').show();
            $('.about').hide();

            $http({
                method: 'GET',
                url: $scope.apiurl.concat("files/"),
            }).then(function successCallback(response) {

                $scope.gallerySize = response.data.length;
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

                /* create rows of 4 out of the mediaitems array */
                for (var index = 0, row = -1; index < $scope.mediaitems.length; index++) {
                    if (index % 4 === 0) {
                        row++;
                        $scope.gallery[row] = [];
                    }
                    $scope.gallery[row].push($scope.mediaitems[index]);
                }

            }, function errorCallback(response) {
                $log.info(response.data);
            });

        };

        $scope.showMore = function () {
            $scope.moreMediaitems += 2;
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
