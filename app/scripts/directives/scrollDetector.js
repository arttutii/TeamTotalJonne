'use strict';

angular.module('theApp')
	.directive('scrollDetector', function ($window) {
	    /* Scroll detector */
	    return function (scope) {
	        scope.hideNav = false;
	        var position = $(window).scrollTop();
	        //console.log("position: " + position);
	        angular.element($window).bind('scroll', function () {

	            /* Detect scroll direction: */
	            var scroll = $(window).scrollTop();
	            //console.log("scroll: " + scroll);

	            if (scroll > position) {
	                //console.log("scrolling down");
	                scope.hideNav = true;
	            } else {
	                //console.log("scrolling up");
	                scope.hideNav = false;
	            }
	            position = scroll;

	            /* Detect scroll offset: */
	            if (this.pageYOffset >= 100) {
	                /*  */
	            } else {
	                /*  */
	            }
	            scope.$apply();
	        });
	    };
	})
