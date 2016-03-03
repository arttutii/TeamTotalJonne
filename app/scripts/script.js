angular.module('theApp', ['ui.bootstrap']);

$(document).ready(function () {

    // Check if user is logged in

    if (localStorage.getItem("userID") !== null) {
        $('#loggedin').append('logged in as: ' + localStorage.getItem("username"));
        console.log("user logged in");
    } else {
        console.log("user not logged in");
    }

    /* variable for nightmode button*/
    var clicked = false;

    $('#modebtn').click(function () {
        if (clicked === false) {
            $('#navi').attr("class", "navbar navbar-default navbar-fixed-top ");
            $("body").css("background-color", "white");
            $('#contentArea').css("background-color", "#ebebeb");
            $('#contentArea').css("color", "black");
            $('#modebtn').css("color", "#888888");
            $('#contents').css("background-color", "#ebebeb");
            $('#contentsrow').css("background-color", "#ebebeb");
            $('#contentsrow').css("color", "black");
            $('#contents').css("color", "black");
            $('#thePage').css("background-color", "white");
            clicked = true;
        } else {
            $('#navi').attr("class", "navbar navbar-default navbar-inverse navbar-fixed-top ");
            $('body').css("background-color", "#222222");
            $('#contentArea').css("background-color", "#383838");
            $('#contentArea').css("color", "white");
            $('#modebtn').css("color", "white");
            $('#contents').css("background-color", "#383838");
            $('#contentsrow').css("background-color", "#383838");
            $('#contentsrow').css("color", "white");
            $('#contents').css("color", "white");
            $('#thePage').css("background-color", "#222222");
            clicked = false;
        }

    });
    // Get all the users and media objects from database
    $.getUsers();
    $.getMediaitems();

    $("a.modalLink").click(function (e) {
        e.preventDefault();
    });
});
