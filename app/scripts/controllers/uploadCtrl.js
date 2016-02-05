angular.module('theApp')
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

                if (response.data) /* equals to object or some other shit tbd --> success } else --> uploadfail*/
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
    });
