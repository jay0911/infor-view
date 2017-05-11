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

.controller('adminparkingmaintenance', function($scope,$ionicLoading,$ionicPopup,$ionicModal,$http,$ionicListDelegate){
	
	$ionicLoading.show({
	    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
	            '<p>Loading ...</p>',
	          animation: 'fade-in',
	          noBackdrop: false,
	          maxWidth: 500,
	          showDelay: 0
	});
	
	$ionicModal.fromTemplateUrl('templates/modal.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modal = modal;
	});
	
	$ionicModal.fromTemplateUrl('templates/modaledit.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modaledit = modal;
	});
	
	$ionicModal.fromTemplateUrl('templates/modaledituser.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modaledituser = modal;
	});
	
	$ionicModal.fromTemplateUrl('templates/modaluser.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modaluser = modal;
	});
	
	$scope.clearSearch = function(){	  
		  $scope.searchval = {};
	};
	
	$scope.openMainModal = function(){
		$scope.resetMain();
		$scope.modal.show();
	}
	
	$scope.openEditModal = function(){
		$scope.resetEdit();
		$scope.modaledit.show();
	}
	
	//resets scope screen values for main screen
	$scope.resetMain = function(){
		$scope.req.parkingid = "";
		$scope.parking.parkingid = "";
		$scope.tandemusers = [];
		$scope.isparkingtandemvalue.checked = false;
		$scope.tandem = {user1:"-",user2:"-",userid1:0,userid1:0};
	}
	//resets scope screen values for edit screen
	$scope.resetEdit = function(){
		$scope.req.parkingid = "";
		$scope.parkingedit.parkingid = "";
		$scope.tandemusersedit = [];
		$scope.isparkingtandemvalue.checked = false;
		$scope.tandemedit = {user1:"-",user2:"-",userid1:0,userid1:0};
	}
	  
	$scope.searchval = {};
	$scope.arrayParkingEdit = [];
	$scope.parkings = [];
	$scope.req = [];
	$scope.parking = {
			isparkingtandem:""
    		,parkingid:""
    		,userid:0
	};
	$scope.parkingedit = {
			isparkingtandem:""
    		,parkingid:""
    		,userid:0
	};
	$scope.isparkingtandemvalue = {checked:false};
	
	$scope.tandem = {user1:"-",user2:"-",userid1:0,userid2:0};
	$scope.tandemusers = [];
	$scope.usertoadd = {value:0};
	$scope.parking.isparkingtandem = "No";
	
	$scope.create = function(item){
		$ionicLoading.show({
	    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
	            '<p>Loading ...</p>',
	          animation: 'fade-in',
	          noBackdrop: false,
	          maxWidth: 500,
	          showDelay: 0
		});
		
		if($scope.parking.parkingid == ""){
			$scope.req.parkingid = true;

		}else{
			//loop two times for saving the tandem user
			if($scope.parking.isparkingtandem == "Yes"){
				$scope.tandemusers.push({userid:$scope.tandem.userid1});
				$scope.tandemusers.push({userid:$scope.tandem.userid2});
			}else{
				$scope.tandemusers.push({userid:$scope.tandem.userid1});
			}
			for(i=0;i<$scope.tandemusers.length;i++){
				  $scope.parking.userid = $scope.tandemusers[i].userid;
				  console.log($scope.parking);
				  $http.post('/saveparking', JSON.stringify($scope.parking)).then(function (data) {

					  	  console.log(data);
					  	  $ionicLoading.hide();
				  }, function (data) {
						  console.log(data);
				  }).finally(function() {
						    // called no matter success or failure
				  });		
			}
		    $scope.parkings.push(
			    		{
			    		isparkingtandem:$scope.parking.isparkingtandem
			    		,parkingid:$scope.parking.parkingid
			    		});
			$scope.modal.hide();
		}
	}
	
	$scope.adduser = function(item){
		$scope.hidemainmodal();
		if(item==1){
			$scope.usertoadd.value = 1;
		}else{
			$scope.usertoadd.value = 2;
		}
	};
	$scope.adduseredit = function(item){
		$scope.hideeditmodal();
		if(item==1){
			$scope.usertoadd.value = 1;
		}else{
			$scope.usertoadd.value = 2;
		}
	};
	$scope.createuser = function(item){
		$scope.hidemodaluser();
		if($scope.usertoadd.value == 1){
			$scope.tandem.user1 = item.firstname;
			$scope.tandem.userid1 = item.userid;
		}else{
			$scope.tandem.user2 = item.firstname;
			$scope.tandem.userid2 = item.userid;
		}
	};
	
	$scope.edituser = function(item){
		$scope.hidemodaledituser();
		if($scope.usertoadd.value == 1){
			$scope.tandemedit.user1 = item.firstname;
			$scope.tandemedit.userid1 = item.userid;
		}else{
			$scope.tandemedit.user2 = item.firstname;
			$scope.tandemedit.userid2 = item.userid;
		}
	};
	
	$scope.isparkingtandemvalueChange = function(){
		if($scope.isparkingtandemvalue.checked == true){
			$scope.parking.isparkingtandem = "Yes";
			console.log($scope.parking.isparkingtandem);
		}else{
			$scope.parking.isparkingtandem = "No";
			console.log($scope.parking.isparkingtandem);
		}
		
	};
	  
		var init = function () {
		    $http({
				  method: 'GET',
				  url: '/getallparking'
				}).then(function successCallback(response) {
				    console.log(response);
				    for (i=0;i<response.data.length;i++){
					    $scope.parkings.push(
					    		{
					    		isparkingtandem:response.data[i].isparkingtandem
					    		,parkingid:response.data[i].parkingid
					    		});
				    }  
				     $ionicLoading.hide(); 
				}, function errorCallback(response) {
					 console.log(response);
			});	
		};
		
		init();
		
		$scope.users = [];
		
		$scope.editParking = function(item){
			$scope.openEditModal();
			$ionicListDelegate.closeOptionButtons(); 	
			if(item.isparkingtandem == "Yes"){
				$scope.isparkingtandemvalue.checked = true;
			}else{
				$scope.isparkingtandemvalue.checked = false;
			}
			$scope.parkingedit.parkingid = item.parkingid; 
			
			$http.post('/selectParkingUsers', JSON.stringify($scope.parkingedit)).then(function (data) {
				console.log(data.data);
				if($scope.isparkingtandemvalue.checked == true){
					$scope.tandemedit.user1 = data.data[0].firstname
					$scope.tandemedit.userid1 = data.data[0].userid;
					
					$scope.tandemedit.user2 = data.data[1].firstname;
					$scope.tandemedit.userid2 = data.data[1].userid;
				}else{
					$scope.tandemedit.user1 = data.data[0].firstname
					$scope.tandemedit.userid1 = data.data[0].userid;
				}
			}, function (data) {
				console.log(data);
			}).finally(function() {
					    // called no matter success or failure
			});
			$scope.currentindex = $scope.parkings.indexOf(item);
		}
		
		$scope.editme = function(item) {
			$ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Loading ...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 500,
		          showDelay: 0
			});
			if($scope.parkingedit.parkingid == ""){
				$scope.req.parkingid = true;

			}else{
				//loop two times for saving the tandem user
				console.log($scope.isparkingtandemvalue.checked);
				if($scope.isparkingtandemvalue.checked == true){
					$scope.tandemusersedit.push({userid:$scope.tandemedit.userid1});
					$scope.tandemusersedit.push({userid:$scope.tandemedit.userid2});
					$scope.parkingedit.isparkingtandem = "Yes"
				}else{				
					$scope.tandemusersedit.push({userid:$scope.tandemedit.userid1});
					$scope.parkingedit.isparkingtandem = "No"
				}
				for(i=0;i<$scope.tandemusersedit.length;i++){
					  $scope.parkingedit.userid = $scope.tandemusersedit[i].userid;
					  console.log($scope.parkingedit);
					  $scope.arrayParkingEdit.push({
						  isparkingtandem:$scope.parkingedit.isparkingtandem,
						  parkingid:$scope.parkingedit.parkingid,
						  userid:$scope.parkingedit.userid
					  });
				}
				}
				console.log($scope.arrayParkingEdit);
				$http.post('/editparking', JSON.stringify($scope.arrayParkingEdit)).then(function (data) {
				  	  console.log(data);
				  	  $ionicLoading.hide();
				}, function (data) {
					  console.log(data);
				}).finally(function() {
					    // called no matter success or failure
				});	
				$scope.parkings.splice($scope.currentindex, 1);
			    $scope.parkings.push(
				    		{
				    		isparkingtandem:$scope.parkingedit.isparkingtandem
				    		,parkingid:$scope.parkingedit.parkingid
				    		});
				$scope.modaledit.hide();
		};

		
		$scope.deleteParking = function(item){
			$scope.parkings.splice($scope.parkings.indexOf(item), 1);
			
	    	$scope.parking = {	
	    			isparkingtandem:item.isparkingtandem
		    		,parkingid:item.parkingid
		    		};
	    	
			$http.post('/deleteparking', JSON.stringify($scope.parking)).then(function (data) {
				console.log(data);
			}, function (data) {
				console.log(data);
			}).finally(function() {
					    // called no matter success or failure
			});
		};
		
		$scope.hidemodaluser = function(){
			$scope.modaluser.hide();
			$scope.modal.show();
		};
		
		$scope.hidemodaledituser = function(){
			$scope.modaledituser.hide();
			$scope.modaledit.show();
		};
		
		
		$scope.hidemainmodal = function(){
			$scope.modaluser.show();
			$scope.modal.hide();
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
				  url: '/getallavailuserforparking'
				}).then(function successCallback(response) {
				    console.log(response);
				    for (i=0;i<response.data.inforUsers.length;i++){
					    $scope.users.push(
					    		{
					    		userid:response.data.inforUsers[i].userid
					    		,firstname:response.data.inforUsers[i].firstname
					    		,lastname:response.data.inforUsers[i].lastname
					    		,contactnumber:response.data.inforUsers[i].contactnumber
					    		,emailaddress:response.data.inforUsers[i].emailaddress
					    		,inforaddress:response.data.inforUsers[i].inforaddress
					    		,position:response.data.inforUsers[i].position
					    		,username:response.data.inforUsers[i].username
					    		,gender:response.data.inforUsers[i].gender
					    		});
				    }  
				     $ionicLoading.hide(); 
				}, function errorCallback(response) {
					 console.log(response);
			});
		};
		
		$scope.hideeditmodal = function(){
			$scope.modaledituser.show();
			$scope.modaledit.hide();
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
				  url: '/getallavailuserforparking'
				}).then(function successCallback(response) {
				    console.log(response);
				    for (i=0;i<response.data.inforUsers.length;i++){
					    $scope.users.push(
					    		{
					    		userid:response.data.inforUsers[i].userid
					    		,firstname:response.data.inforUsers[i].firstname
					    		,lastname:response.data.inforUsers[i].lastname
					    		,contactnumber:response.data.inforUsers[i].contactnumber
					    		,emailaddress:response.data.inforUsers[i].emailaddress
					    		,inforaddress:response.data.inforUsers[i].inforaddress
					    		,position:response.data.inforUsers[i].position
					    		,username:response.data.inforUsers[i].username
					    		,gender:response.data.inforUsers[i].gender
					    		});
				    }  
				     $ionicLoading.hide(); 
				}, function errorCallback(response) {
					 console.log(response);
			});
		};
})


.controller('carown', function($scope, $ionicHistory,$state,$ionicModal,$ionicListDelegate,$http,$ionicLoading) {
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
	
	$scope.showModal = function(){
	    $scope.req.carplatenumber = false;
	    $scope.req.carcolor = false;
	    $scope.req.carbrand = false;
		$scope.modal.show();
	}
	  
	$scope.create = function(u) { 
		console.log(u);
	    if(u.carplatenumber == null){
	    	$scope.req.carplatenumber = true;
	    }
	    if(u.carcolor == null){
	    	$scope.req.carcolor = true;
	    }
	    if(u.carbrand == null){
	    	$scope.req.carbrand = true;
	    }
	    
	    if(u.carplatenumber == ""){
	    	$scope.req.carplatenumber = true;
	    }
	    if(u.carcolor == ""){
	    	$scope.req.carcolor = true;
	    }
	    if(u.carbrand == ""){
	    	$scope.req.carbrand = true;
	    }
	    	
	    if(u.carplatenumber != null && u.carcolor != null && u.carbrand != null && u.carplatenumber != "" && u.carcolor != "" && u.carbrand != ""){
	    	$scope.replica.carplatenumber = u.carplatenumber;
	    	$scope.replica.carbrand = u.carbrand;
	    	$scope.replica.carcolor = u.carcolor;
	    	
	    	$scope.cars.push({carplatenumber:$scope.replica.carplatenumber
	    		,carbrand:$scope.replica.carbrand
	    		,carcolor:$scope.replica.carcolor
	    		});
	    	$scope.car = {carplatenumber:$scope.replica.carplatenumber
		    		,carbrand:$scope.replica.carbrand
		    		,carcolor:$scope.replica.carcolor
		    		};
	    	
			  $http.post('/addcar', JSON.stringify($scope.car)).then(function (data) {
			  	  console.log(data.data.code); 
			  }, function (data) {
					  console.log(data);
			  }).finally(function() {
					    // called no matter success or failure
			    	u.carplatenumber = "";
			    	u.carbrand = "";
			    	u.carcolor = "";
			    	$scope.car.carplatenumber= "";
			    	$scope.car.carbrand="";
			    	$scope.car.carcolor="";
			    	$scope.modal.hide();
			  });
	    	
	    }  
	};
	
	$scope.editme = function(u) { 
		console.log(u);
	    if(u.carplatenumber == null){
	    	$scope.req.carplatenumber = true;
	    }
	    if(u.carcolor == null){
	    	$scope.req.carcolor = true;
	    }
	    if(u.carbrand == null){
	    	$scope.req.carbrand = true;
	    }
	    
	    if(u.carplatenumber == ""){
	    	$scope.req.carplatenumber = true;
	    }
	    if(u.carcolor == ""){
	    	$scope.req.carcolor = true;
	    }
	    if(u.carbrand == ""){
	    	$scope.req.carbrand = true;
	    }
	    	
	    if(u.carplatenumber != null && u.carcolor != null && u.carbrand != null && u.carplatenumber != "" && u.carcolor != "" && u.carbrand != ""){
	    	
	    	$scope.car = {carplatenumber:u.carplatenumber
		    		,carbrand:u.carbrand
		    		,carcolor:u.carcolor
		    		};
	    	
			$http.post('/editcar', JSON.stringify($scope.car)).then(function (data) {
				console.log(data);
			}, function (data) {
				console.log(data);
			}).finally(function() {
					    // called no matter success or failure
			});
	    	
	    	$scope.replica.carplatenumber = u.carplatenumber;
	    	$scope.replica.carbrand = u.carbrand;
	    	$scope.replica.carcolor = u.carcolor;
	    	
	    	u.carplatenumber = "";
	    	u.carbrand = "";
	    	u.carcolor = "";
	    	$scope.car.carplatenumber= "";
	    	$scope.car.carbrand="";
	    	$scope.car.carcolor="";
			$scope.cars.splice($scope.currentindex, 1);
			
	    	$scope.cars.push({carplatenumber:$scope.replica.carplatenumber
	    		,carbrand:$scope.replica.carbrand
	    		,carcolor:$scope.replica.carcolor
	    		});
	    	
	    	$scope.modaledit.hide();
	    }
	    
	};
	
    $scope.onItemDelete = function(item) {
    	console.log($scope.cars.indexOf(item));
		$scope.cars.splice($scope.cars.indexOf(item), 1);
		
    	$scope.car = {carplatenumber:item.carplatenumber
	    		,carbrand:item.carbrand
	    		,carcolor:item.carcolor
	    		};
    	
		$http.post('/deletecar', JSON.stringify($scope.car)).then(function (data) {
			console.log(data);
		}, function (data) {
			console.log(data);
		}).finally(function() {
				    // called no matter success or failure
		});
	   
    };
    
    $scope.onItemEdit = function(item) {
    	$ionicListDelegate.closeOptionButtons(); 	
    	$scope.edit.carplatenumber = item.carplatenumber;
    	$scope.edit.carbrand = item.carbrand;
    	$scope.edit.carcolor = item.carcolor;
    	$scope.currentindex = $scope.cars.indexOf(item);
    	$scope.modaledit.show();
    };
    
    
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
			  url: '/getcarowned'
			}).then(function successCallback(response) {
			    console.log(response);
			    for (i=0;i<response.data.length;i++){
				    $scope.cars.push({carplatenumber:response.data[i].carplatenumber,carbrand:response.data[i].carbrand
				    		,carcolor:response.data[i].carcolor
				    		});
			    }  
			    $ionicLoading.hide(); 
			}, function errorCallback(response) {
				 console.log(response);
		});	
	};
	
	init();
	
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
.controller('adminrolemaintenance', function($scope,$ionicPopup,$http,$ionicLoading) {
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
			  url: '/getroles'
			}).then(function successCallback(response) {
			    console.log(response);
			    for (i=0;i<response.data.length;i++){
			    	 $scope.roles.push(response.data[i])
			    }  
			    $ionicLoading.hide();
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