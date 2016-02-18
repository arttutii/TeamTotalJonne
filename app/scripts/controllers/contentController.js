'use strict';

angular.module('theApp')
    .controller('contentController', function ($scope, $uibModal, $http, $log, $sce) {
        // variable to use in counting images, how many to show at once
        $scope.moreImages = 10;
        // array for having the usernames of media uploaders at hand
        var userArray = [];
        // array for images to show on site
        $scope.images = [];
        // gallery size to show on site
        $scope.gallerySize = 0;

        // function to make video elements show
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };

        // function to show about page
        $scope.aboutPage = function () {

            $('#contentsrow').hide();
            $('.about').show();
            $('#hamburger').click();

        };

        $scope.showImages = function () {

            $('#contentsrow').show();
            $('.about').hide();

            $http({
                method: 'GET',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
            }).then(function successCallback(response) {
                $scope.gallerySize = response.data.length;

                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i] === null) {
                        // break out of the if-else when no media files are found
                        break;
                    } else {
                        // create an image object which holds data for each image
                        var imgobj = {
                            path: 'http://util.mw.metropolia.fi/uploads/' + response.data[i].path,
                            title: response.data[i].title,
                            type: response.data[i].type,
                            mimetype: response.data[i].mimeType,
                            uploader: userArray[response.data[i].userId]
                        };
                        $scope.images.push(imgobj);
                    }
                }
                //console.log(response.data);
                $log.info($scope.images);

            }, function errorCallback(response) {
                angular.element(document.getElementById('contents')).append(response.data);
            });

        };


        $scope.showMore = function (amount) {
            if (amount !== null) {
                $scope.moreImages += amount;
            } else {
                $scope.moreImages += 10;
            }

        };

        // function to call showimages in the DOM ready
        $.getImages = function () {
            $scope.showImages();
        };

        $.getUsers = function () {
            $http({
                method: 'GET',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/users'
            }).then(function successCallback(response) {

                for (var i = 0; i < response.data.length; i++) {
                    userArray[i] = (response.data[i].username);
                }


            }, function errorCallback(response) {
                angular.element(document.getElementById('contents')).append(response.data);

            });


        };

        /* function for instantiating modal displays */
        $scope.showModal = function (pic) {
            $log.info(pic);
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/mediaitemModal.html',
                controller: 'ModalInstanceController',
                size: 'lg',
                resolve: {
                    images: function () {
                        return $scope.images;
                    },
                    pic: function () {
                        return pic;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        };
    });
