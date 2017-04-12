angular.module('ionicApp', ['ionic','ui.router'])
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
          templateUrl: "sidemenus/register.html",
          controller: 'registercontroller'
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

.controller('shoplistctrl', function($scope) {

	  $scope.data = {
			    showDelete: false
			  };
			  
			  $scope.edit = function(item) {
			    alert('Edit Item: ' + item.id);
			  };
			  $scope.share = function(item) {
			    alert('Share Item: ' + item.id);
			  };
			  
			  $scope.onItemDelete = function(item) {
			    $scope.items.splice($scope.items.indexOf(item), 1);
			  };
	  $scope.clearSearch = function(){	  
		  $scope.searchval = {};
	  };
	  
	  $scope.searchval = {};
	
	  $scope.items = [
		    { id: 0 , name:"jay" },
		    { id: 1 , name:"ryan" },
		    { id: 2 , name:"oliveros" },
		    { id: 3 , name:"eraine" },
		    { id: 4 , name:"bernadette" },
		    { id: 5 , name:"santos" },
		    { id: 6 , name:"otayde" },
		    { id: 7 , name:"angeles" },
		    { id: 8 , name:"jaylord" },
		    { id: 9 , name:"jaybee" },
		    { id: 10 , name:"jayson" }
		  ];

})


.controller('registercontroller', function($scope,$http,$state,$ionicPopup,$ionicLoading) {
	
	var init = function () {
	    $http({
		  method: 'GET',
		  url: '/getroles'
		}).then(function successCallback(response) {
		     console.log(response);
		     for (i=0;i<response.data.length;i++){
		    	 $scope.roles.push(response.data[i])
		     }
		     //$scope.roles = response.data.contactnumber;     
		}, function errorCallback(response) {
			 console.log(response);
		});	
	   
	};

	init();
	
	
	$scope.gender=[
       	{text:"Male",value:"male"},
       	{text:"Female",value:"female"}
    ];
	  
	$scope.gendervalue = {value:"male"};
	  
	$scope.roles = [];
	  
	$scope.customer = {
			  firstname:"",
			  lastname:"",
			  contactnumber:"",
			  emailaddress:"",
			  address:"",
			  gender:"",
			  username:"",
			  password:""
	};
	  	  
	  
	$scope.onsubmit = function (){  
		  $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Registering ...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 500,
		          showDelay: 0
		  });
		  
		  $scope.customer.gender = $scope.gendervalue.value;
		  
		  
		  $http.post('/registerhere', JSON.stringify($scope.customer)).then(function (data) {
			  	  console.log(data.data.code);
			  	  if(data.data.code == "200"){
			  		  	   
			       var alertPopup = $ionicPopup.alert({
			           title: 'Registration',
			           template: 'Success!'
			        });

			        alertPopup.then(function(res) {
			        	$state.go('tabs.loginregister', {}, { location: false } );
			        });
			  	  };
			  	  if(data.data.code == "400"){
				       var alertPopup = $ionicPopup.alert({
				           title: 'Error',
				           template: 'Username Already Exist!'
				        });

				        alertPopup.then(function(res) {
				        	//to do
				        });
			  	  };
			  	  
		  }, function (data) {
				  console.log(data);
		  }).finally(function() {
				    // called no matter success or failure
			  $ionicLoading.hide();
		  });		  
	};			  			
})

.controller('backController', function($scope, $ionicHistory,$state) {
	$scope.myGoBack = function() {
		if($ionicHistory.currentStateName() == 'tabs.register'){
			$state.go('tabs.loginregister', {}, { location: false } );
		}
	};
});