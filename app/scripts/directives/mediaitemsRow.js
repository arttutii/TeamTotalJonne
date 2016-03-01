angular.module('theApp')
    .directive('mediaitemsRow', function ($log) {
        function link(scope, element, attrs) {
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.offsetHeight,
                body = document.body,
                html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            if (docHeight > windowHeight) {
                $log.info(scope.hasRoom);
            }
        }
        return {
            replace: true,
            templateUrl: 'views/mediaitemsRow.html',
            link: link
        };
    });
