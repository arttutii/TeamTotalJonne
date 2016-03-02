'use strict';

angular.module('theApp')
    .controller('LoginController', function ($scope, $http, $httpParamSerializer, $log) {
        
        // variables for disabling signin and register buttons
        $scope.lbuttondisabled = true;
        $scope.rbuttondisabled = true;

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

                    if (response.data.status == "ok"){
                        $('#registerSuccess').show();
                        $('#hamburger').click();
                        $('#loginModal').modal('hide');
                        
                        setTimeout(function () {
                            $scope.signIn($('#rusername').val(), $('#rpassword').val());
                        }, 3000);
                        
                    } else {
                        $log.info(response.data);
                        if (response.data.error == "username already exists"){
                            $('#userExists').fadeIn();
                            $('#rusername').focus();
                            $log.info("username already exists, choose another username");
                        } else {
                            $log.info(response.data);
                        }
                        
                    }
                    
                }, function (error) {
                    $log.info("check your inputs " + error.data);
                });
        };

        // variables for login inputs
        $scope.lusername;
        $scope.lpassword;


        if ($('#lusername').val().length >= 1){
            $('#loginFormInputs').addClass("has-success");
        } else {
            $('#loginFormInputs').removeClass("has-success");
        }   

        $scope.loginDisabled = function () {   
            if ($('#lusername').val().length >= 1 && $('#lpassword').val().length >= 1 ) {
                $scope.lbuttondisabled = false;
            } else {
                $scope.lbuttondisabled = true;
            }
        };

        // variables for register inputs
        $scope.rusername;
        $scope.rpassword;
        $scope.remail;

        $scope.registerDisabled = function () {           

            if ($('#rusername').val().length >= 1 && $('#rpassword').val().length >= 1 && $('#remail').val().length >= 1 && $scope.registerUserFound == false) {
                $scope.rbuttondisabled = false;
            } else {
                $scope.rbuttondisabled = true;
            }
        };



        $scope.userExistance = function () {
            $scope.registerUserFound;

            if ($('#rusername').val().length >= 1) {
                $http({
                        method: 'POST',
                        url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/user/exists',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $httpParamSerializer({
                            username: $('#rusername').val()
                        })
                    }).then(function (response) {

                        if (response.data.userFound == true){
                            $scope.registerUserFound = true;
                            $('#userRegistration').addClass("has-error");
                            $('#userRegistration').removeClass("has-success");
                            $('#userExists').fadeIn();
                        } else {
                            $scope.registerUserFound = false;
                            $('#userRegistration').addClass("has-success");
                            $('#userRegistration').removeClass("has-error");
                            $('#userExists').fadeOut();

                        }
                        
                    }, function (error) {
                        $log.info("check your inputs " + error.data);
                    });

            } else {
                $('#userRegistration').removeClass("has-success");
                $('#userRegistration').removeClass("has-error");
            }
        };

         $scope.signIn = function (uName, pWord) {

            if (uName == null){
                uName = $scope.lusername;
                pWord = $scope.lpassword;
            }

                //log user in
                $http({
                  method: 'POST',
                  url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/login',
                  headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
                  data: $httpParamSerializer({
                          username: uName,
                          password: pWord
                        })
                }).then(function (response) {
                    
                    if (response.data.status == "login ok"){
                        localStorage.setItem("userID", response.data.userId);
                        localStorage.setItem("username", uName);
                        location.reload();
                    } else {
                        console.log(JSON.stringify(response.data));
                        // clear fields, notify button
                        $('.loginputs').val('');
                        $scope.loginDisabled();
                    }
   
                }, function (error) {
                    console.log("login oh dog: " + error.data);
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
                $scope.signIn();
            }
        });

        $(".reginputs").keyup(function (event) {
            if (event.keyCode == 13) {
                $scope.registerUser();
            }
        });

        $('#rusername').focusout(function() {
            $scope.userExistance();
        });

        $(".reginputs").focusout(function() {
            $scope.registerDisabled();
        });
    });
