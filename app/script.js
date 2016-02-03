angular.module('theApp', [])

.controller('contentCtrl', function ($scope, $http) {
    var imagesCount = 0;

    showImages = function () {

        $http({
            method: 'GET',
            url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
        }).then(function successCallback(response) {
            console.log(response.data);
            angular.element(document.getElementById('contents')).append("<Strong>Gallery size: " + response.data.length + "<Strong> <br>");
            for (var i = 0; i < 10; i++) {
                imagesCount += 1;

                if (response.data[i] == null) {
                    /*Do this check only that console doesn't notify null values :D */
                    break;
                } else if (response.data[i].type == 'image') {
                    angular.element(document.getElementById('contents')).append('<img width="100%" height="100%" src="http://util.mw.metropolia.fi/uploads/' + response.data[i].path + '"> <br>' +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>");
                } else if (response.data[i].type == 'video') {
                    angular.element(document.getElementById('contents')).append("<video width='100%' height='100%' controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "' > </video><br>" +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>");
                } else if (response.data[i].type == 'audio') {
                    angular.element(document.getElementById('contents')).append("<audio controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "'' > </audio><br>" +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>");
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
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>");
                } else if (response.data[i].type == 'video') {
                    angular.element(document.getElementById('contents')).append("<video width='100%' height='100%' controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "' > </video><br>" +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>");
                } else if (response.data[i].type == 'audio') {
                    angular.element(document.getElementById('contents')).append("<audio controls><br> <source src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "' type='" + response.data[i].mimeType + "'' > </audio><br>" +
                        "<p class='imgTitle'>" + (i + 1) + ": " + response.data[i].title + "</p>");
                }
            }

        }, function errorCallback(response) {
            angular.element(document.getElementById('contents')).append(response.data);

        });

    }

})


.directive('scrollDetector', function ($window) {
    /* Scroll detector */
    return function (scope) {
        scope.hideNav = false;
        var position = $(window).scrollTop();
        console.log("position: " + position);
        angular.element($window).bind('scroll', function () {

            /* Detect scroll direction: */
            var scroll = $(window).scrollTop();
            console.log("scroll: " + scroll);

            if (scroll > position) {
                console.log("scrolling down");
                scope.hideNav = true;
            } else {
                console.log("scrolling up");
                scope.hideNav = false;
            }
            position = scroll;

            /* Detect scroll offset: */
            if (this.pageYOffset >= 100) {
                /*  */
            } else {
                /*  */
            }
            scope.$apply();
        });
    };
})

.controller('uploadCtrl', function ($scope, $http) {

    /* Get the file type */
    $scope.setMediaFile = function (element) {
        $scope.mimeType = element.files[0].type;
        $scope.type = $scope.mimeType.substr(0, 5);
    };

    $scope.uploadImage = function () {

        var fd = new FormData(document.getElementById('uploadForm'));
        fd.append('user', 6);
        fd.append('type', $scope.type);
        fd.append('mime-type', $scope.mimeType);
        var request = $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });
        request.then(function (response) {

            if (response.data)
                $('#upSuccess').show();
            $('#hamburger').click();
            angular.element(document.getElementById('contents')).empty();
            showImages();


            console.log("success?: \n" + response.data);
        }, function (error) {
            $('#upFailed').show();
            console.log("oh dog: " + error.data);
        });
    };


})


.controller('loginCtrl', function ($scope, $http) {
    /* content TBA */


});

$(document).ready(function () {
    /*
        Click functions
    */
    $("#uploadbtn").click(function () {
        $("#uploadModal").modal();
    });
    $("#loginbtn").click(function () {
        $("#loginModal").modal();
    });
    $("#regislink").click(function () {
        $('.registration').fadeIn();
        $('.login').hide();
    });
    $("#loginlink").click(function () {
        $('.registration').hide();
        $('.login').fadeIn();
    });

    /* variable for nightmode button*/
    var clicked = false;

    $('#modebtn').click(function () {
        if (clicked == false) {
            $('#navi').attr("class", "navbar navbar-default navbar-fixed-top ");
            $("body").css("background-color", "white");
            $('#contentArea').css("background-color", "#ebebeb");
            $('#contentArea').css("color", "black");
            $('#modebtn').css("color", "#888888");
            $('#contents').css("background-color", "#ebebeb");
            $('#contentsrow').css("background-color", "#ebebeb");
            $('#contents').css("color", "black");
            $('#thePage').css("background-color", "white");
            clicked = true;
        } else {
            $('#navi').attr("class", "navbar navbar-default navbar-inverse navbar-fixed-top ");
            $('body').css("background-color", "#222222");
            $('#contentArea').css("background-color", "#383838");
            $('#contentArea').css("color", "white");
            $('#modebtn').css("color", "white");
            $('#contents').css("background-color", "#383838");
            $('#contentsrow').css("background-color", "#383838");
            $('#contents').css("color", "white");
            $('#thePage').css("background-color", "#222222");
            clicked = false;
        }

    });

    /* Executing show images*/
    showImages();

});
