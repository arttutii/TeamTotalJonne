angular.module('theApp')
    .directive('myModalContent', function () {
    function link() {
        // get the comments and description for selected media
        $scope.getComments();
        $scope.getDescription();
        $scope.getFavourites();
    }
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/myModalContent.html',
            link: link
        };
    });
