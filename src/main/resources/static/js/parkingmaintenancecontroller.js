start.controller('adminparkingmaintenance', function($scope,$ionicLoading,$ionicPopup,$ionicModal,$http,$ionicListDelegate){
	
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
			$scope.tandemusers = [];
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
	
	BOBOOBOBBOOBo
	
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
				$scope.arrayParkingEdit = [];
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
			$scope.clearSearch();
			$scope.modaluser.hide();
			$scope.modal.show();
		};
		
		$scope.hidemodaledituser = function(){
			$scope.clearSearch();
			$scope.modaledituser.hide();
			$scope.modaledit.show();
		};
		
		
		$scope.hidemainmodal = function(){
			$scope.users = [];
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
		    $scope.users = [];
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