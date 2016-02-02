angular.module('theApp', [])

.controller('contentCtrl', function ($scope, $http) {
    this.content = "";
    var jotain = this;
    var imagesCount = 0;

   
    $http({
        method: 'GET',
        url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
    }).then(function successCallback(response) {
        console.log(response.data);
 angular.element(document.getElementById('jee')).append("<Strong>Gallery size: " + response.data.length + "<Strong> <br>");
        for (var i = 0; i < 10; i++) {
            imagesCount += 1;
            angular.element(document.getElementById('jee')).append("<img width='100%' height='100%' src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "''>" + "<br>" +
                "<p class='imgTitle'>img " + (i + 1) + ": " + response.data[i].title + "</p>");
        }

    }, function errorCallback(response) {
        jotain.content = "apuva \n";
        angular.element(document.getElementById('jee')).append(response.data);
    });

    $scope.showMore = function() {

        $http({
        method: 'GET',
        url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
    }).then(function successCallback(response) {
        console.log("10 more images shown");

        for (var i = imagesCount; i < (imagesCount+10); i++) {    
        angular.element(document.getElementById('jee')).append("<img width='100%' height='100%' src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "''>" + "<br>" +
         "<p class='imgTitle'>img " + (i + 1) + ": " + response.data[i].title + "</p>");
        }

    }, function errorCallback(response) {
        jotain.content = "apuva \n";
        angular.element(document.getElementById('jee')).append(response.data);
    });

    }

})


.controller('uploadCtrl', function ($scope, $http) {

        /* Get the file type */
        $scope.setMediaFile = function (element) {
            $scope.mimeType = element.files[0].type;
            $scope.type = $scope.mimeType.substr(0,5);
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
                $('#upSuccess').show();
                $('#hamburger').click();
                console.log("success?: " + response);
            }, function (error) {
                console.log("oh dog: " + error);
            });
        };


});

$(document).ready(function(){
    /* Hiding some stuff */
    $('#upSuccess, #upFailed').hide();

    /*
        Button click function to open a pop-up window
    */
    $("#uploadbtn").click(function(){
        $("#uploadModal").modal();
    });


});

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar').outerHeight();
console.log(navbarHeight);
console.debug(navbarHeight);

$(window).scroll(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop;

    // Make sure scroll is more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > navbarHeight) {
        $('.navbar').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll up
        if (st + $(window).height() < $(document).height()) {
            $('.navbar').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}
