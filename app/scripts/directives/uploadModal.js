angular.module('theApp')
    .directive('uploadModal', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/uploadModal.html'
        };
    });
