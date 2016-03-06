angular.module('theApp')
    .controller('ModalInstanceController', function ($httpParamSerializer, $http, $scope, $uibModalInstance, $log, mediaitems, item) {
        // variables to use for selected media
        $scope.item = item;
        $scope.mediaitems = mediaitems;
        $scope.selectedItem = {
            item: $scope.mediaitems[0]
        };
        $scope.comments = [];
        $scope.description;
        $scope.favourites = [];

        $scope.getComments = function () {

            $http({
                method: 'GET',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/' + item.fileId
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
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/file/' + item.fileId
            }).then(function successCallback(response) {
                // if no description is given, show description as empty space
                if (response.data.description != "undefined") {
                    $scope.description = response.data.description;
                } else {
                    $scope.description = "";
                }

            }, function errorCallback(response) {
                $log.info(response.data);
            });
        };

        $scope.getFavourites = function() {
            $http({
                    method: 'GET',
                    url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/likes/user/' + localStorage.getItem('userID')
                }).then(function successCallback(response) {

                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i] === null) {
                            // break out of the if-else when no media files are found
                            break;
                        } else {
                            $scope.favourites.push(response.data[i]);
                        }
                    }
                    
                }, function errorCallback(response) {
                    $log.info(response.data);
                });

        };

        $scope.favouriteButtonShow = function() {
            
            if ($scope.favourite != null) {
                $scope.fileLiked = true;
            } else {
                $scope.fileLiked = false;
            }

        };
        
        $scope.favouriteMedia = function() {
            
            $scope.getFavourites();
            $scope.favourite;

            // look for favourite media in favourites
            
            for (var i = 0; i < $scope.favourites.length; i++){
                if ($scope.favourites[i].fileId == item.fileId) {
                    $scope.favourite = $scope.favourites[i].fileId;
                } else {
                    // nothing
                }
            }
            $log.info($scope.favourite);

            if ($scope.favourite == null){
                $log.info("favouriting item");
                $scope.favourite = item.fileId;
                $http({
                    method: 'GET',
                    url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/like/' + item.fileId + "/" + localStorage.getItem('userID')
                }).then(function successCallback(response) {
                    $scope.fileLiked = true;
                    $scope.favouriteButtonShow();
                    
                }, function errorCallback(response) {
                    $log.info(response.data);
                });
            } else {
                $log.info("unfavouriting item");
                $scope.favourite = 1;
                $http({
                    method: 'GET',
                    url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/unlike/' + item.fileId + "/" + localStorage.getItem('userID')
                }).then(function successCallback(response) {
                    $scope.fileLiked = false;
                    $scope.favouriteButtonShow();
                    
                    
                }, function errorCallback(response) {
                    $log.info(response.data);
                });
            }

        };

        $scope.postComment = function () {
            $scope.loadingComments = true;
            var comment = $scope.composedComment;

            $log.info($scope.composedComment);
            $http({
                method: 'POST',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/comment/file/' + item.fileId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({
                    user: localStorage.getItem('userID'),
                    comment: comment
                })
            }).then(function successCallback(response) {
                $scope.loadingComments = false;
                if (response.data.status == "comment added") {
                    $log.info("comment added!");
                    $scope.comments = [];
                    $scope.getComments();
                    $('#typeComment').val('');
                    $scope.composedComment = null;
                    $("#comments").collapse("show");
                } else {
                    $log.info("comment not added, check fields");
                }

                $("#postCommentButton").removeClass("active");

            }, function errorCallback(response) {
                $log.info(response.data);
                if (response.data.error == "comment is missing or too short") {

                } else {

                }
            });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selectedItem.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        // get the comments and description for selected media
        $scope.getComments();
        $scope.getDescription();
        $scope.getFavourites();


    });
