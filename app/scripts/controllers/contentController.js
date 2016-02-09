'use strict'; 

angular.module('theApp')
	.controller('contentCtrl', function ($scope, $http) {
    // variable to use in counting images, how many to show at once
    var imagesCount = 0;
    // array for having the usernames of media uploaders at hand 
    var userArray = [];
    var imageArray  = [];

    $.showImages = function () {

        $http({
            method: 'GET',
            url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
        }).then(function successCallback(response) { 
            angular.element(document.getElementById('contents')).append("<Strong>Gallery size: " + response.data.length + "<Strong> <br>");
            for (var i = 0; i < 10; i++) {
                imagesCount += 1;

                if (response.data[i] == null) {
                    // break out of the if-else when no media files are found
                    break;
                } else if (response.data[i].type == 'image') {
                    imageArray.push('http://util.mw.metropolia.fi/uploads/' + response.data[i].path);
                    angular.element(document.getElementById('contents')).append('<img width="100%" height="100%" src="http://util.mw.metropolia.fi/uploads/' + response.data[i].path + '"> <br>' +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>" +
                        "<p class='uploader'>" + "uploader: " + userArray[response.data[i].userId] + "</p>") ;
                } else if (response.data[i].type == 'video') {
                    angular.element(document.getElementById('contents')).append("<video width='100%' height='100%' controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "' > </video><br>" +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>"+
                        "<p class='uploader'>" + "uploader: " + userArray[response.data[i].userId] + "</p>") ;
                } else if (response.data[i].type == 'audio') {
                    angular.element(document.getElementById('contents')).append("<audio controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "'' > </audio><br>" +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>"+
                        "<p class='uploader'>" + "uploader: " + userArray[response.data[i].userId] + "</p>") ;
                }
            }

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
                    break;
                } else if (response.data[i].type == 'image') {
                    angular.element(document.getElementById('contents')).append('<img width="100%" height="100%" src="http://util.mw.metropolia.fi/uploads/' + response.data[i].path + '"> <br>' +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>" +
                        "<p class='uploader'>" + "uploader: " + userArray[response.data[i].userId] + "</p>") ;
                } else if (response.data[i].type == 'video') {
                    angular.element(document.getElementById('contents')).append("<video width='100%' height='100%' controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "' > </video><br>" +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>"+
                        "<p class='uploader'>" + "uploader: " + userArray[response.data[i].userId] + "</p>") ;
                } else if (response.data[i].type == 'audio') {
                    angular.element(document.getElementById('contents')).append("<audio controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "'' > </audio><br>" +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>"+
                        "<p class='uploader'>" + "uploader: " + userArray[response.data[i].userId] + "</p>") ;
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