angular.module('ionicApp', ['ionic','ui.router'])

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
      views: {
        'menuContent': {
          controller: 'userinfocontroller',
          templateUrl: "sidemenus/userinfo.html"
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
.controller('carown', function($scope, $ionicHistory,$state,$ionicModal,$ionicListDelegate,$http) {
	$scope.cars = [];
	$scope.car = [];
	$scope.edit = [];
	$scope.replica = {};
	
	$scope.req = [];
	
	$ionicModal.fromTemplateUrl('templates/modal.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modal = modal;
	});
	
	$ionicModal.fromTemplateUrl('templates/modal-edit.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modaledit = modal;
	});
	  
	$scope.create = function(u) { 
		console.log(u);
	    if(u.platenumber == null){
	    	$scope.req.platenumber = true;
	    }
	    if(u.color == null){
	    	$scope.req.color = true;
	    }
	    if(u.carbrand == null){
	    	$scope.req.carbrand = true;
	    }
	    	
	    if(u.platenumber != null && u.color != null && u.carbrand != null){
	    	$scope.replica.platenumber = u.platenumber;
	    	$scope.replica.carbrand = u.carbrand;
	    	$scope.replica.color = u.color;
	    	
	    	$scope.cars.push({platenumber:$scope.replica.platenumber
	    		,carbrand:$scope.replica.carbrand
	    		,color:$scope.replica.color
	    		});
	    	u.platenumber = "";
	    	u.carbrand = "";
	    	u.color = "";
	    	$scope.modal.hide();
	    }  
	};
	
	$scope.editme = function(u) { 
		console.log(u);
	    if(u.platenumber == null){
	    	$scope.req.platenumber = true;
	    }
	    if(u.color == null){
	    	$scope.req.color = true;
	    }
	    if(u.carbrand == null){
	    	$scope.req.carbrand = true;
	    }
	    	
	    if(u.platenumber != null && u.color != null && u.carbrand != null){
	    	$scope.replica.platenumber = u.platenumber;
	    	$scope.replica.carbrand = u.carbrand;
	    	$scope.replica.color = u.color;
	    	
	    	u.platenumber = "";
	    	u.carbrand = "";
	    	u.color = "";
			$scope.cars.splice($scope.currentindex, 1);
			
	    	$scope.cars.push({platenumber:$scope.replica.platenumber
	    		,carbrand:$scope.replica.carbrand
	    		,color:$scope.replica.color
	    		});
	    	
	    	$scope.modaledit.hide();
	    }
	    
	};
	
    $scope.onItemDelete = function(item) {
    	console.log($scope.cars.indexOf(item));
		$scope.cars.splice($scope.cars.indexOf(item), 1);
    };
    
    $scope.onItemEdit = function(item) {
    	$ionicListDelegate.closeOptionButtons();
    	$scope.edit.platenumber = item.platenumber;
    	$scope.edit.carbrand = item.carbrand;
    	$scope.edit.color = item.color;
    	$scope.currentindex = $scope.cars.indexOf(item);
    	$scope.modaledit.show();
    };
    
	var init = function () {
	    $http({
			  method: 'GET',
			  url: '/getcarowned'
			}).then(function successCallback(response) {
			    console.log(response);
			     	 
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