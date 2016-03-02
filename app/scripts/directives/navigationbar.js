angular.module('theApp')
    .directive('navigationBar', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/navigationbar.html'
        };
    });
