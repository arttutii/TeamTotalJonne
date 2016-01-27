angular.module('myApp', ['myModule'])
.controller('GreetingsController', function () {
  this.greeting = "Hello, is it me you're looking for?";
  this.who = "Angular";


})

.controller('ContentController', function ($scope, $http) {
	this.content = "";
	var jotain = this;
	$http({
		  method: 'GET',
		  url: 'http://util.mw.metropolia.fi/ImageRekt/api/v2/users'
		}).then(function successCallback(response) {
            console.log(response.data);

             for(var i = 0; i<response.data.length; i++){
             	jotain.content = jotain.content + 
             	"username: " + response.data[i].user + 
             	" -- email: " + response.data[i].email + 
             	"\n";
            }
        }, function errorCallback(response) {
		    jotain.content = "apuva \n";
		    angular.element(document.getElementById('yea')).append(response.data);
		  });



});



