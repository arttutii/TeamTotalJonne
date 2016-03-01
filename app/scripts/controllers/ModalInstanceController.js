angular.module('theApp')
    .controller('ModalInstanceController', function ($httpParamSerializer, $http, $scope, $uibModalInstance, $log, mediaitems, item) {
        // variables to use for selected media
        $scope.item = item;
        $scope.mediaitems = mediaitems;
        $scope.selectedItem = {
            item: $scope.mediaitems[0]
        };
        // container for comments for specific item
        $scope.comments = [];

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
                $scope.description = response.data.description;
                $log.info(response.data);

            }, function errorCallback(response) {
                $log.info(response.data);
            });
        };

        $scope.postComment = function () {

            var comment = $scope.comment;

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

                if (response.data.status == "comment added") {
                    $log.info("comment added!");
                    $('#comments').empty();
                    $scope.getComments();
                } else {
                    $log.info("comment not added, check fields");
                }

            }, function errorCallback(response) {
                $log.info(response.data);
            });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.selectedItem.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        // get the comments for selected media
        $scope.getComments();


    });
