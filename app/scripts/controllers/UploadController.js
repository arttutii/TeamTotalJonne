'use strict';

angular.module('theApp')
    .controller('UploadController', function ($scope, $http, $log) {

        /* Get the file type */
        $scope.setMediaFile = function (element) {
            if (element.files[0].type != "undefined"){
                $scope.mimeType = element.files[0].type;
                $scope.type = $scope.mimeType.substr(0, 5);
            } else {
                $log.info("unknown file type");
            }
        };

         $scope.upbuttondisabled = true;
         $scope.uploadDisabled = function () {
            if ($('#upTitle').val().length >= 2 ) {
                $scope.upbuttondisabled = false;
            } else {
                $scope.upbuttondisabled = true;
            }
        };

        $scope.uploadItem = function () {

            var fd = new FormData(document.getElementById('uploadForm'));

            if (localStorage.getItem('username') !== null) {
                fd.append('user', (localStorage.getItem('userID')));
                fd.append('type', $scope.type);
                    if ($scope.description !== null ){
                        fd.append('description', $scope.description);
                    } else {
                        fd.append('description', " ");
                    }
                fd.append('mime-type', $scope.mimeType);
                $http.post('http://util.mw.metropolia.fi/ImageRekt/api/v2/upload', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function (response) {

                if (response.data.fileId !== null) {
                    $('#uploadModal').modal('hide');
                    $('#upSuccess').fadeIn();
                    setTimeout(function () {
                        $('#upSuccess').fadeOut();
                    }, 6000);
                    $('#hamburger').click();
                    $.getMediaitems();

                    $log.info("file uploaded: " + JSON.stringify(response.data));

                } else {
                    $log.info("upload failed");
                    $('#upFailed').fadeIn();
                    setTimeout(function () {
                        $('#upFailed').fadeOut();
                    }, 6000);
                }

                }, function (error) {
                    $('#upFailed').fadeIn();
                    setTimeout(function () {
                        $('#upFailed').fadeOut();
                    }, 6000);
                    console.log("oh dog: " + error.data);
                });
            } else {
                console.log("user not logged in, can't upload media");
            }
        };
    });
