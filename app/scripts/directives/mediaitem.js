angular.module('theApp')
    .directive('mediaitem', function ($log) {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/mediaitem.html'
        };
    });
