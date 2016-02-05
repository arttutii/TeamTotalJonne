angular.module('theApp')
    .controller('loginCtrl', function ($scope, $http, $httpParamSerializer) {

        $scope.registerUser = function () {

            $http({
                method: 'POST',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/register',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({
                    username: $('#rusername').val(),
                    email: $('#remail').val(),
                    password: $('#rpassword').val()
                })
            }).then(function (response) {
                $scope.signIn($('#rusername').val(), $('#rpassword').val());
                $('#registerSuccess').show();
                $('#hamburger').click();

                console.log("Registration success?: \n" + response.data);
            }, function (error) {
                console.log("oh dog: " + error.data);
            });
        };
        $scope.signIn = function (uName, pWord) {

            $http({
                method: 'POST',
                url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({
                    username: uName,
                    password: pWord
                })
            }).then(function (response) {

                localStorage.setItem("userID", response.data.userId);
                localStorage.setItem("username", $('#rusername').val());
                $('#hamburger').click();

                console.log("Login success?: \n" + response.data);
            }, function (error) {
                console.log("oh dog: " + error.data);
            });
        };
    });
