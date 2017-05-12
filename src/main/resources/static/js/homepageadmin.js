var start = angular.module('ionicApp', ['ionic','ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      controller: 'maincontroller',
      templateUrl: "sidemenus/admintabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/home.html",
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
    })
    .state('tabs.carown', {
      url: "/carown",
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "sidemenus/carown.html",
          controller: 'carown'
        }
      }
    })
    .state('tabs.adminrolemaintenance', {
      url: "/adminrolemaintenance",
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "sidemenus/adminrolemaintenance.html",
          controller: 'adminrolemaintenance'
        }
      }
    })
    .state('tabs.adminparkingmaintenance', {
      url: "/adminparkingmaintenance",
      cache: false,
      views: {
        'menuContent': {
          templateUrl: "sidemenus/adminparkingmaintenance.html",
          controller: 'adminparkingmaintenance'
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