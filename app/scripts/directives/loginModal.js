angular.module('theApp')
    .directive('loginModal', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/loginModal.html'
        };
    });