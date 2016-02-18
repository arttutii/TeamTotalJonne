angular.module('theApp')
    .directive('mediaitem', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/mediaitem.html'
        };
    });
