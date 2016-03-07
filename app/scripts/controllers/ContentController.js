'use strict';

angular.module('theApp')
    .controller('ContentController', function ($scope, $rootScope, $uibModal, $http, $log, $sce, $window, $document) {
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
        // array for starred mediaitems by user logged in
        $scope.starredMediaitems = [];
        // object variable for selecting a single mediaitem
        $scope.mediaitem = {};
        // object variable for selecting a single user
        $scope.user = {};
        // object variable the user currently logged in
        //$scope.loggedUser = {};
        // reference to body element for showModal()
        var bodyRef = angular.element($document[0].body);
        // function to make video elements show
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        if (localStorage.getItem("userID") !== null) {
            $http.get($scope.apiurl.concat("user/", localStorage.getItem("userID"))).then(
                function successCallback(response) {
                    $scope.loggedUser = response.data;
                });

            $scope.userLogged = true;
        } else {
            $scope.loggedUser = {};
            $scope.userLogged = false;
        }
        var parseThumbnails = function (array) {
            /* parse source and thumbnail paths */
            for (var i = 0; i < array.length; i++) {
                if (array[i].type !== "video") {
                    array[i].thumbNails.small = mediaurl.concat("thumbs/", "tn160_", array[i].path);
                    array[i].thumbNails.medium = mediaurl.concat("thumbs/", "tn320_", array[i].path);
                    array[i].thumbNails.large = mediaurl.concat("thumbs/", "tn640_", array[i].path);
                    array[i].path = mediaurl.concat(array[i].path);
                    array[i].uploader = $scope.users[array[i].userId - 1];
                } else {
                    array[i].thumbNails.small = mediaurl.concat("thumbs/", "tn160_", array[i].path, ".png");
                    array[i].thumbNails.medium = mediaurl.concat("thumbs/", "tn320_", array[i].path, ".png");
                    array[i].thumbNails.large = mediaurl.concat("thumbs/", "tn640_", array[i].path, ".png");
                    array[i].path = mediaurl.concat(array[i].path);
                }
            }
            return array;
        };

        $scope.mySubmissions = function () {
            $('#search').focus();
            $('#search').val(localStorage.getItem('username'));
        };

        $scope.userSubmissions = function (userid) {
            $http.get($scope.apiurl.concat("files/user/", userid)).then(
                function (response) {
                    $scope.mediaitems = parseThumbnails(response.data);
                    $log.info(response);
                });
        };

        $scope.showMediaitems = function () {

            $http({
                method: 'GET',
                url: $scope.apiurl.concat("files/"),
            }).then(function successCallback(response) {

                $scope.mediaitems = parseThumbnails(response.data);

                if ($scope.userLogged) {
                    $http.get($scope.apiurl.concat("likes/user/", localStorage.getItem("userID"))).then(
                        function successCallback(response) {
                            $scope.starredMediaitems = response.data;
                        }
                    );
                }
            }, function errorCallback(response) {
                $log.info(response.data);
            });

        };

        $scope.showMore = function () {
            $scope.moreMediaitems += 4;
        };

        $scope.goHome = function () {
            location.reload(true);
            window.scrollTo(0, 0);
        };

        $scope.userLogout = function () {
            localStorage.clear();
            $scope.loggedUser = {};
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
            bodyRef.addClass('modal-open');
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/mediaitemModal.html',
                controller: 'ModalInstanceController',
                windowClass: 'mediaitemModal',
                size: 'lg',
                resolve: {
                    mediaitems: function () {
                        return $scope.mediaitems;
                    },
                    item: function () {
                        return item;
                    },
                    apiurl: function () {
                        return $scope.apiurl;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                bodyRef.removeClass('modal-open');
                $scope.selected = selectedItem;
            }, function () {});

        };

        $scope.loadRow = function () {
            $log.info('load');
        };

        $scope.focusSearch = function () {
            $('#loginbtnContainer').fadeOut();
        };

        $scope.blurSearch = function () {
            $('#loginbtnContainer').fadeIn();
        };

    });
