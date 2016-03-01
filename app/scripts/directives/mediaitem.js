angular.module('theApp')
    .directive('mediaitem', function ($log) {
        function link(scope, element, attrs) {
        }
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/mediaitem.html',
            link: link
        };
    });
