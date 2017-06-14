start.controller('parkinparkout', function($scope,$http,$ionicLoading,$state,$ionicPopup,$ionicHistory,$ionicModal) {
	$scope.screen = {
		singlehide:true,
		tandemhide:true,
		parkouthide:true,
		tandeminfo:true
	};
	
	$scope.email = {
		senderAddress:"",
		toAddress:"",
		subject:"",
		message:"",
		host:"",
		socketPort:"",
		socketClass:"",
		auth:"",
		port:"",
		userName:"",
		password:""
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
	
	$scope.cars=[];
	$scope.car = {value:""};
	
	$scope.transaction = {
			userid:"",
			parkingid:"",
			carid:""
	};
	
	$scope.timeout = function(){ 
		  $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Processing ...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 500,
		          showDelay: 0
		  });
		  	  
		  $http.post('/timeout', JSON.stringify($scope.transaction)).then(function (data) {
			  	  console.log(data.data.code);
			  	  if(data.data.code == "200"){		  		  	   
			       var alertPopup = $ionicPopup.alert({
			           title: 'Time out',
			           template: 'Success!'
			        });

			       $ionicHistory.nextViewOptions({
			    	    disableBack: true
			       });
			       alertPopup.then(function(res) {
			        	$state.go('tabs.home', {}, { location: false } );
			       });
			  	  };
			  	  if(data.data.code == "400"){
				       var alertPopup = $ionicPopup.alert({
				           title: 'Error',
				           template: 'error in timing in!'
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
	}
	
	$scope.timein = function(){
		  
		  $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Processing ...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 500,
		          showDelay: 0
		  });
		  
		  $scope.transaction.carid = $scope.car.value;
		  	  
		  $http.post('/timein', JSON.stringify($scope.transaction)).then(function (data) {
			  	  console.log(data.data.code);
			  	  if(data.data.code == "200"){		  		  	   
			       var alertPopup = $ionicPopup.alert({
			           title: 'Time in',
			           template: 'Success!'
			        });

			       $ionicHistory.nextViewOptions({
			    	    disableBack: true
			       });
			       alertPopup.then(function(res) {
			        	$state.go('tabs.home', {}, { location: false } );
			       });
			  	  };
			  	  if(data.data.code == "400"){
				       var alertPopup = $ionicPopup.alert({
				           title: 'Error',
				           template: 'error in timing in!'
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
	}
	
	$scope.sendemail = function(){
		  
		  $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Processing ...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 500,
		          showDelay: 0
		  });		  
		  	  
		  $http.post('/sendemail', JSON.stringify($scope.email)).then(function (data) {
		       
			  	  console.log(data.data.code);
			  	  if(data.data.code == "200"){		  	   
			       var alertPopup = $ionicPopup.alert({
			           title: 'Sending Email',
			           template: 'Success!'
			        });

			       $ionicHistory.nextViewOptions({
			    	    disableBack: true
			       });
			       alertPopup.then(function(res) {
			        	$state.go('tabs.home', {}, { location: false } );
			       });
			  	  };
			  	  if(data.data.code == "400"){
				       var alertPopup = $ionicPopup.alert({
				           title: 'Error',
				           template: 'error in sending email!'
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
		  $scope.modalemailtandem.hide();
	
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
				    for (i=0;i<response.data.inforCars.length;i++){
				    	 $scope.cars.push(response.data.inforCars[i]);
				    }  
					$scope.transaction.userid = response.data.inforParking.userid;
					$scope.transaction.parkingid = response.data.inforParking.parkingid;
			    	
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
			    		$scope.screen.tandeminfo = true;
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
	
	$ionicModal.fromTemplateUrl('templates/modal-emailtandem.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modalemailtandem = modal;
	});
})