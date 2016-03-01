angular.module('theApp')
    .directive('navbar', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/navbar.html',
            link: function () {
                $(".navbar-fixed-top").autoHidingNavbar();
            }
        };
    });
