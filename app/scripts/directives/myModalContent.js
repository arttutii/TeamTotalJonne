angular.module('theApp')
    .directive('myModalContent', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/myModalContent.html'
        };
    });
