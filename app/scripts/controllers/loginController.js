'use strict';

angular.module('theApp')
    .controller('LoginController', function ($scope, $http, $httpParamSerializer, $log) {
        // variables for inputs
        $scope.username;
        $scope.password;

        $scope.registerUser = function () {

            // check if user exists
            if ($scope.userExistance($('#rusername').val()) == "false") {
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
                    $('#registerSuccess').show();
                    $('#hamburger').click();
                    $scope.signIn($('#rusername').val(), $('#rpassword').val());
                    $log.info("Registration success?: " + response.data);

                }, function (error) {
                    $log.info("register error: " + error.data);
                });
            } else {
                $log.info("username unavailable");
            }
        };

        $scope.disabled = function () {
            $scope.buttondisabled = true;

            if ($('#lusername').val().length > 1 && $('#lpassword').val().length > 1) {
                $scope.buttondisabled = false;
            } else {
                $scope.buttondisabled = true;
            }
        };

        $scope.signIn = function (uName, pWord) {
            if (uName === null) {
                uName = $scope.username;
                pWord = $scope.password;
            }

            //log user in
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
                if (response.data.status == "login ok") {
                    localStorage.setItem("userID", response.data.userId);
                    localStorage.setItem("username", uName);
                    location.reload();
                } else {
                    $log.info(JSON.stringify(response.data));
                    // clear fields, notify button
                    $('.loginputs').val('');
                    $scope.disabled();
                }

            }, function (error) {
                $log.info("login oh dog: " + error.data);
            });

        };

        // variable and function for showing signin/register
        var clicked = true;
        $scope.hideRegis = function () {

            if (clicked) {
                $('.registration').fadeIn();
                $('.login').hide();
                clicked = false;
            } else {
                $('.registration').hide();
                $('.login').fadeIn();
                clicked = true;
            }

        };

        // enter-keypress for inputfields
        $(".loginputs").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#signinbtn").click();
            }
        });

        $(".reginputs").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#registerbtn").click();
            }
        });
    });
