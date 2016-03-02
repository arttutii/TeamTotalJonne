angular.module('theApp')
    .controller('ModalInstanceController', function ($httpParamSerializer,$http,$scope, $uibModalInstance, $log, images, pic) {
        // variables to use for selected media
        $scope.pic = pic;
        $scope.images = images;
        $scope.selectedItem = {
            pic: $scope.images[0]
        };
        $scope.comments = [];
        $scope.description;

        $scope.getComments = function() {

            $http({
                method: 'GET',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/' + pic.id
            }).then(function successCallback(response) {

                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i] === null) {
                        // break out of the if-else when no media files are found
                        break;
                    } else {
                       $scope.comments.push(response.data[i]);
                    }
                }

            }, function errorCallback(response) {
                $log.info(response.data);
            });
        };

        $scope.getDescription = function () {

            $http({
                method: 'GET',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/file/' + pic.id
            }).then(function successCallback(response) {
                // if no description is given, show description as empty space
                if (response.data.description != "undefined"){
                    $scope.description = response.data.description;
                } else {
                    $scope.description = "";
                }

            }, function errorCallback(response) {
                $log.info(response.data);
            });
        }

        $scope.commentbuttondisabled = true;
        $scope.postCommentDisabled = function() {

            if ($('#typeComment').val().length >= 2) {
                $scope.commentbuttondisabled = false;
            } else {
                $scope.commentbuttondisabled = true;
            }
        };

        $scope.postComment = function() {

            var comment = $scope.comment;

            $http({
                  method: 'POST',
                  url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comment/file/' + pic.id,
                  headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
                  data: $httpParamSerializer({
                          user: localStorage.getItem('userID'),
                          comment: comment
                        })
                }).then(function successCallback(response) {

                    if (response.data.status == "comment added") {
                        $log.info("comment added!" );
                        $scope.comments = [];
                        $scope.getComments();
                        $('#typeComment').val('');
                    } else {
                        $log.info("comment not added, check fields");
                    }

            }, function errorCallback(response) {
                $log.info(response.data);
                if (response.data.error == "comment is missing or too short"){

                } else {

                }
            });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selectedItem.pic);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel ');
        };


        // get the comments and description for selected media
        $scope.getComments();
        $scope.getDescription();


    });
