'use strict';

angular.module('theApp')
    .directive('scrollDetector', function ($window, $log) {
        /* Scroll detector */
        return {
            restrict: 'A',
            scope: true,
            link: link
        };

        function link(scope, element, attrs) {
            scope.hideNav = false;
            var position = $(window).scrollTop();
            angular.element($window).bind('scroll', function () {

                var windowHeight = "innerHeight" in window ? window.innerHeight : document.offsetHeight;
                var body = document.body,
                    html = document.documentElement;
                var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                var windowBottom = windowHeight + window.pageYOffset;
                /* Detect scroll direction: */
                scope.scroll = $(window).scrollTop();
                if (scope.scroll > position) {
                    // scrolling down
                    // scope.hideNav = true;
                    // $("#navi").slideUp("slow");
                    if (windowBottom >= docHeight) {
                        /* Scroll reached the bottom */
                        scope.$apply(attrs.reachedBottom);
                    }
                } else {
                    // scrolling up
                    // scope.hideNav = false;
                    // $("#navi").slideDown("slow");
                }
                position = scope.scroll;
                scope.$apply();
            });
        }
    });
