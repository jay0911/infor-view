angular.module('ionicApp', ['ionic','ui.router'])

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
      views: {
        'menuContent': {
          controller: 'userinfocontroller',
          templateUrl: "sidemenus/userinfo.html"
        }
      }
    })
    .state('tabs.adminrolemaintenance', {
      url: "/adminrolemaintenance",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/adminrolemaintenance.html",
          controller: 'adminrolemaintenance'
        }
      }
    })
    .state('tabs.adminparkingmaintenance', {
      url: "/adminparkingmaintenance",
      views: {
        'menuContent': {
          templateUrl: "sidemenus/adminparkingmaintenance.html",
          controller: 'adminparkingmaintenance'
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

.controller('maincontroller', function($scope,$ionicLoading,$ionicPopup){
	$scope.dologout = function (){
	     var confirmPopup = $ionicPopup.confirm({
	         title: 'Hello',
	         template: 'Are you sure you want to logout?'
	       });
	       confirmPopup.then(function(res) {
	         if(res) {  
	  		 $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Loging out...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 200,
		          showDelay: 500,
		      duration: 3000
			 }).then(function(){
				 window.location.href = '/logout';
			 });
	         } else {
	           console.log('You are not sure');
	         }
	     });
	       

	};
})


.controller('userinfocontroller', function($scope,$http,$ionicLoading,$ionicPopup,$state,$ionicPopover){
	
	  $ionicLoading.show({
	    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
	            '<p>Loading ...</p>',
	          animation: 'fade-in',
	          noBackdrop: false,
	          maxWidth: 500,
	          showDelay: 0
	  });
	
	    $ionicPopover.fromTemplateUrl('templates/popover.html', {
		    scope: $scope,
		}).then(function(popover) {
		    $scope.popover = popover;
		});
	    
	    $scope.getItem = function(item){
	    	$scope.customer.position = item.role;
	    	$scope.popover.hide();
	    };
	
		$scope.customer = {
				  firstname:"",
				  lastname:"",
				  contactnumber:"",
				  emailaddress:"",
				  address:"",
				  gender:"",
				  position:"",
				  username:"",
				  password:""
		};
	  

	  
	  $scope.dataloaded = false;
	  
	  $scope.gender=[
	       	{text:"Male",value:"male"},
	       	{text:"Female",value:"female"}
	      ];
	$scope.roles = [];
	$scope.role={value:""};
	$scope.gendervalue = {value:""};
	
	var init = function () {
		    $http({
				  method: 'GET',
				  url: '/getroles'
				}).then(function successCallback(response) {
				    console.log(response);
				    for (i=0;i<response.data.length;i++){
				    	 $scope.roles.push(response.data[i])
				    }  
				     
					$http({
							  method: 'GET',
							  url: '/currentuserinfo'
					}).then(function successCallback(response) {
							     console.log(response);
							     $scope.customer.contactnumber = response.data.inforUser.contactnumber;
							     $scope.customer.address = response.data.inforUser.inforaddress;
							     $scope.customer.emailaddress = response.data.inforUser.emailaddress;
							     $scope.gendervalue.value = response.data.inforUser.gender;
							     $scope.customer.position = response.data.inforUser.position;
							     $scope.customer.username = response.data.inforUser.username;
							     $scope.customer.firstname = response.data.inforUser.firstname;
							     $scope.customer.lastname = response.data.inforUser.lastname;
							     $scope.dataloaded = true;	
							     
							     //remove backdrop
							     $ionicLoading.hide();
					}, function errorCallback(response) {
								 console.log(response);
					});	 
				}, function errorCallback(response) {
					 console.log(response);
			});	
	};

	init();
		
	$scope.onsubmit = function (){
			  
			  $ionicLoading.show({
			    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
			            '<p>Modifying ...</p>',
			          animation: 'fade-in',
			          noBackdrop: false,
			          maxWidth: 500,
			          showDelay: 0
			  });
			  
			  $scope.customer.gender = $scope.gendervalue.value;
			   
			  $http.post('/modifyaccount', JSON.stringify($scope.customer)).then(function (data) {
				  	  console.log(data.data.code);
				  	  if(data.data.code == "200"){
				  		  	   
				       var alertPopup = $ionicPopup.alert({
				           title: 'Modifying',
				           template: 'Success!'
				        });

				        alertPopup.then(function(res) {
				        	//do after click ok
				        	$state.go('tabs.home', {}, { location: false } );
				        	window.location.href = '/homepage'
				        });
				  	  };
				  	  if(data.data.code == "400"){
					       var alertPopup = $ionicPopup.alert({
					           title: 'Error',
					           template: 'Modifying Failed!'
					        });

					        alertPopup.then(function(res) {
					        	//do after click ok
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
.controller('adminrolemaintenance', function($scope,$ionicPopup,$http) {
	$scope.roleinput = {};
	$scope.roles = [];
    $scope.customer = {
      	  position:""
    };
    
    
	$scope.clickme = function(){
	     var alertPopup = $ionicPopup.alert({
	       title: 'Hello!',
	       template: 'Swipe left to delete..'
	     });
	     alertPopup.then(function(res) {
	       console.log('Thank you for deleting');
	     });
	   
	};
    $scope.doAdd = function(item) {
        //check to see if text has been entered, if not exit
        if (item.input == null || item.input == ''){return;}
          
          $scope.customer.position = item.input;
          //if there is text add it to the array 
          $scope.roles.push({role:item.input});
		  $http.post('/saverole', JSON.stringify($scope.customer)).then(function (data) {
			  	  console.log(data);
		  }, function (data) {
				  console.log(data);
		  }).finally(function() {
				    // called no matter success or failure
		  });
          
          //clear the textbox
          $scope.roleinput.input = '';

      };
      $scope.onItemDelete = function(item) {
    	   
    	  $scope.customer.position = item.role;
	      $http.post('/deleterole', JSON.stringify($scope.customer)).then(function (data) {
				  $scope.roles.splice($scope.roles.indexOf(item), 1);
			  	  console.log(data);
		  }, function (data) {
				  console.log(data);
		  }).finally(function() {
				    // called no matter success or failure
		  });
      };
      
  	var init = function () {
	    $http({
			  method: 'GET',
			  url: '/getroles'
			}).then(function successCallback(response) {
			    console.log(response);
			    for (i=0;i<response.data.length;i++){
			    	 $scope.roles.push(response.data[i])
			    }  
			}, function errorCallback(response) {
				 console.log(response);
		});	
  	};

  	init();
})
.controller('backController', function($scope, $ionicHistory,$state) {
	$scope.myGoBack = function() {
/*		if($ionicHistory.currentStateName() == 'tabs.register'){
			$state.go('tabs.loginregister', {}, { location: false } );
		}*/
	};
});