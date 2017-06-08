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
    .state('tabs.parkinparkout', {
      cache: false,
      url: "/parkinparkout",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/parkinparkout.html",
          controller: 'parkinparkout'
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
.controller('parkinparkout', function($scope,$http,$ionicLoading,$state,$ionicPopup,$ionicHistory,$ionicModal) {
	$scope.screen = {
		singlehide:true,
		tandemhide:true,
		parkouthide:true,
		tandeminfo:true
	};
	
	$scope.tandemdetails = {
		userid:"",
		firstname:"",
		lastname:"",
		position:"",
		contactnumber:"",
		emailaddress:"",
		inforaddress:""
	};
	
	$scope.hello = function(){
		alert('hello');
	}
	
	var init = function () {
		$ionicLoading.show({
	    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
	            '<p>Loading ...</p>',
	          animation: 'fade-in',
	          noBackdrop: false,
	          maxWidth: 500,
	          showDelay: 0
		});
		
	    $http({
			  method: 'GET',
			  url: '/checkregisteredforparking'
			}).then(function successCallback(response) {
			    console.log(response);			    
			    $ionicLoading.hide(); 
			    if(response.data.ajaxResponseBody.code == "400"){
				       var alertPopup = $ionicPopup.alert({
				           title: 'No parking space assign',
				           template: 'Please contact you admin to assign you a parking slot!'
				       });
				       $ionicHistory.nextViewOptions({
				    	    disableBack: true
				       });
				       alertPopup.then(function(res) {
				        	$state.go('tabs.home', {}, { location: false } );
				       });
			    }else{
			    	if(response.data.inforParking.isparkingtandem == "Yes"){
			    		$scope.screen.singlehide = true;
			    		$scope.screen.tandemhide = false;
			    		$scope.screen.tandeminfo = false;
			    		
			    		$scope.tandemdetails.userid = response.data.tandemParkingDetails.userid;
			    		$scope.tandemdetails.firstname = response.data.tandemParkingDetails.firstname;
			    		$scope.tandemdetails.lastname = response.data.tandemParkingDetails.lastname;
			    		$scope.tandemdetails.position = response.data.tandemParkingDetails.position;
			    		$scope.tandemdetails.contactnumber = response.data.tandemParkingDetails.contactnumber;
			    		$scope.tandemdetails.emailaddress = response.data.tandemParkingDetails.emailaddress;
			    		$scope.tandemdetails.inforaddress = response.data.tandemParkingDetails.inforaddress;
			    	}else{
			    		$scope.screen.singlehide = false;
			    		$scope.screen.tandemhide = true;
			    	}
			    	if(response.data.ajaxResponseBody.code == "200"){
			    		$scope.screen.parkouthide = false;
			    		$scope.screen.singlehide = true;
			    		$scope.screen.tandemhide = true;
			    	}else{
			    		$scope.screen.parkouthide = true;
			    	}
			    }
			}, function errorCallback(response) {
				 console.log(response);
		});	
	};
	init();
	
	$ionicModal.fromTemplateUrl('templates/modal-tandeminfo.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modaltandem = modal;
	});
})
.controller('backController', function($scope, $ionicHistory,$state) {
	$scope.myGoBack = function() {
		/*		if($ionicHistory.currentStateName() == 'tabs.register'){
					$state.go('tabs.loginregister', {}, { location: false } );
				}*/
			};
});