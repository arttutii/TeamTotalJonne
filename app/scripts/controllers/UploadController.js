'use strict';

angular.module('theApp')
    .controller('UploadController', function ($scope, $http, $log) {

        /* Get the file type */
        $scope.setMediaitem = function (element) {
            $scope.mimeType = element.files[0].type;
            $scope.type = $scope.mimeType.substr(0, 5);
        };

        $scope.uploadItem = function () {

            var fd = new FormData(document.getElementById('uploadForm'));

            if (localStorage.getItem('username') !== null) {
                fd.append('user', (localStorage.getItem('userID')));
                fd.append('type', $scope.type);
                if ($scope.description !== null) {
                    fd.append('description', $scope.description);
                } else {
                    fd.append('description', "");
                }
                fd.append('mime-type', $scope.mimeType);
                $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function (response) {

                    //if (response.data) /* equals to object or some other shit tbd --> success } else --> uploadfail*/
                    $('#upSuccess').fadeIn();
                    setTimeout(function () {
                        $('#upSuccess').click();
                    }, 6000);
                    $('#hamburger').click();
                    $.getMediaitems();

                    $log.info("file uploaded: " + JSON.stringify(response.data));
                }, function (error) {
                    $('#upFailed').fadeIn();
                    setTimeout(function () {
                        $('#upFailed').click();
                    }, 6000);
                    console.log("oh dog: " + error.data);
                });
            } else {
                console.log("user not logged in, can't upload media");
            }
        };
    });
