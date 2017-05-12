var start = angular.module('ionicApp', ['ionic','ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      controller: 'maincontroller',
      templateUrl: "sidemenus/normaltabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/home.html",
        }
      }
    })
    .state('tabs.carown', {
      cache: false,
      url: "/carown",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/carown.html",
          controller: 'carown'
        }
      }
    })
    .state('tabs.userinfo', {
      url: "/userinfo",
      cache: false,
      views: {
        'menuContent': {
          controller: 'userinfocontroller',
          templateUrl: "sidemenus/userinfo.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

.controller('backController', function($scope, $ionicHistory,$state) {
	$scope.myGoBack = function() {
		/*		if($ionicHistory.currentStateName() == 'tabs.register'){
					$state.go('tabs.loginregister', {}, { location: false } );
				}*/
			};
});