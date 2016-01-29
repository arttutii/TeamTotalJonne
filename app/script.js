angular.module('theApp', [])

.controller('contentCtrl', function ($scope, $http) {
    this.content = "";
    var jotain = this;
    $http({
        method: 'GET',
        url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/files'
    }).then(function successCallback(response) {
        console.log(response.data);

        for (var i = 0; i < response.data.length; i++) {
            jotain.content = jotain.content +
                "pic " + (i + 1) + ": " + response.data[i].title + "\n " + angular.element(document.getElementById('jee')).append("<img width='100' height='100' src='http://util.mw.metropolia.fi/uploads/" + response.data[i].path + "''>"); + "\n";
        }
    }, function errorCallback(response) {
        jotain.content = "apuva \n";
        angular.element(document.getElementById('yea')).append(response.data);
    });



})


.controller('uploadCtrl', function ($scope, $http) {
    this.content = "";
    var jotain = this;
    $http({
        method: 'POST',
        url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/upload'
    }).then(function successCallback(response) {
        /*
        Upload a file

        POST api/v2/upload

        request content-type: multipart/form-data

        Required parameters:

        file: the file itself
        user: user id
        title: file title text
        description: file description text
        type: file type text (image/video/audio)
        Response: file id if success, example:

        {"file_id": "69"}

            */

    }, function errorCallback(response) {
        jotain.content = "someding bad happen \n" + response;
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
