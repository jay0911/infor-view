var start = angular.module('ionicApp', ['ionic','ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "sidemenus/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/home.html"
        }
      }
    })
    .state('tabs.availableslots', {
      url: "/availableslots",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/availableslots.html",
          controller: 'availableslots'
        }
      }
    })
    .state('tabs.login', {
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/login.html",
          controller: 'login'
        }
      }
    })
   .state('tabs.loginregister', {
      url: "/loginregister",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/loginregister.html"
        }
      }
    })
    .state('tabs.register', {
      url: "/register",
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "sidemenus/register.html",
          controller: 'registercontroller'
        }
      }
    })
    ;

   $urlRouterProvider.otherwise("/tab/home");
})
.controller('backController', function($scope, $ionicHistory,$state) {
	console.log("hello");
	$scope.myGoBack = function() {
		if($ionicHistory.currentStateName() == 'tabs.register'){
			$state.go('tabs.loginregister', {}, { location: false } );
		}
	};
});