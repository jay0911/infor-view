start.controller('availableslots', function($scope,$http,$ionicLoading,$state,$ionicPopup,$ionicHistory,$ionicModal){

	
	$scope.typeofslots = [
	                      {text:"Unassigned slots",value:"0"},
	                      {text:"Assigned slots",value:"1"},
	                      {text:"All slots",value:"2"},
	                      {text:"Available slots",value:"3"},
	                      {text:"Unavailable slots",value:"4"}
	                      ];
	
	$scope.selectedslot = {value:""};
	
	$scope.slotlist = [];
	
	$scope.showList = function(){
		$scope.slotlist = [];
		  $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Processing ...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 500,
		          showDelay: 0
		  });
		if($scope.selectedslot.value == "0"){
		    $http.get("/public/getUnassignedSlots").then(function(response) {
		        console.log("getUnassignedSlots");
		        
		        console.log(response.data);
			    for (i=0;i<response.data.inforSlots.length;i++){
			    	 $scope.slotlist.push(response.data.inforSlots[i]);
			    } 
			    $ionicLoading.hide();
			    $scope.modallist.show();		
		    });
		}else if($scope.selectedslot.value == "1"){
		    $http.get("/public/getAssignedSlots").then(function(response) {
		        console.log("getAssignedSlots");
			    for (i=0;i<response.data.inforSlots.length;i++){
			    	 $scope.slotlist.push(response.data.inforSlots[i]);
			    } 
			    $ionicLoading.hide();
		        $scope.modallist.show();
		    });
		}else if($scope.selectedslot.value == "2"){
		    $http.get("/public/getAllSlots").then(function(response) {
		        console.log("getAllSlots");
		        console.log(response.data.inforSlots);
			    for (i=0;i<response.data.inforSlots.length;i++){
			    	 $scope.slotlist.push(response.data.inforSlots[i]);
			    } 
			    $ionicLoading.hide();
		        $scope.modallist.show();
		    });
		}else if($scope.selectedslot.value == "3"){
		    $http.get("/public/getAvailSlot").then(function(response) {
		        console.log("getAvailSlot");
		        console.log(response.data.inforSlots);
			    for (i=0;i<response.data.inforSlots.length;i++){
			    	 $scope.slotlist.push(response.data.inforSlots[i]);
			    } 
			    $ionicLoading.hide();
		        $scope.modallist.show();
		    });
		}
		else if($scope.selectedslot.value == "4"){
		    $http.get("/public/getUnAvailSlot").then(function(response) {
		        console.log("getUnAvailSlot");
		        console.log(response.data.inforSlots);
			    for (i=0;i<response.data.inforSlots.length;i++){
			    	 $scope.slotlist.push(response.data.inforSlots[i]);
			    } 
			    $ionicLoading.hide();
		        $scope.modallist.show();
		    });
		}
	};  
	
	var init = function(){

	}
	
	init();
	
	$scope.userinfo = {};
	
	$scope.showuser = function(user){
		console.log(user);
		$scope.modaluserinfo.show();
		$scope.userinfo.firstname = user.firstname;
		$scope.userinfo.lastname = user.lastname;
		$scope.userinfo.position = user.position;
		$scope.userinfo.contactnumber = user.contactnumber;
		$scope.userinfo.emailaddress = user.emailaddress;
		$scope.userinfo.inforaddress = user.inforaddress;
	}
	
	$ionicModal.fromTemplateUrl('templates/modal-list.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modallist = modal;
	});
	
	$ionicModal.fromTemplateUrl('templates/modal-userinfo.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modaluserinfo = modal;
	});

	
})