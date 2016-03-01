angular.module("theApp")
    .directive("user", ['$http', '$log', function ($http, $log) {

        function link(scope, element, attrs) {

            /* get user object by uid attribute */
            scope.getUserById = function (uid) {
                $http({
                    method: 'GET',
                    url: scope.apiurl.concat("user/", uid)
                }).then(function successCallback(response) {
                    scope.user = response.data;
                }, function errorCallback(response) {
                    $log.info(response.data);
                });
            };
            scope.user = scope.getUserById(attrs.uid);
        }

        return {
            replace: true,
            template: '<a href="#">{{ user.username }}</a>',
            link: link
        };

    }]);
