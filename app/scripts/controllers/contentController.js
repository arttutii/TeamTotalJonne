'use strict'; 

angular.module('theApp')
	.controller('contentCtrl', function ($scope, $http) {
    // variable to use in counting images, how many to show at once
    var imagesCount = 0;
    // array for having the usernames of media uploaders at hand 
    var userArray = [];
    // array for images to show on site
    $scope.images = [];
    // gallery size to show on site
    $scope.gallerySize = 0;

    $.showImages = function () {

        $http({
            method: 'GET',
            url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
        }).then(function successCallback(response) { 
            $scope.gallerySize = response.data.length;
            
            for (var i = 0; i < 10; i++) {
                imagesCount += 1;

                if (response.data[i] == null) {
                    // break out of the if-else when no media files are found
                    break;
                } else {
                    // create an image object which holds data for each image
                    var imgobj = {
                    path: 'http://util.mw.metropolia.fi/uploads/' + response.data[i].path,
                    title: response.data[i].title,
                    type: response.data[i].type,
                    uploader: userArray[response.data[i].userId]
                    };
                    $scope.images.push(imgobj);
                } 
            }
            //console.log($scope.images);

        }, function errorCallback(response) {
            angular.element(document.getElementById('contents')).append(response.data);
        });

    }

    $scope.showMore = function () {

        $http({
            method: 'GET',
            url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
        }).then(function successCallback(response) {
            var newValue = imagesCount + 10;

            for (var i = imagesCount; i < newValue; i++) {

                imagesCount += 1;
                if (response.data[i] == null) {
                    $('#outofpics').show();
                    $('#showMore').hide();
                    setTimeout(function(){
                        $('#outofpics').click();
                    }, 6000);
                    break;
                } else {
                    var imgobj = {
                    path: 'http://util.mw.metropolia.fi/uploads/' + response.data[i].path,
                    title: response.data[i].title,
                    type: response.data[i].type,
                    uploader: userArray[response.data[i].userId]
                    };
                    $scope.images.push(imgobj);
                }
            }

        }, function errorCallback(response) {
            angular.element(document.getElementById('contents')).append(response.data);

        });

    }

    $.getUsers = function() {
        $http({
            method: 'GET',
            url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/users'
        }).then(function successCallback(response) {
            
            for (var i=0; i< response.data.length; i++){
                userArray[i] = (response.data[i].username);   
            }
            
            
        }, function errorCallback(response) {
            angular.element(document.getElementById('contents')).append(response.data);

        });


    }

});