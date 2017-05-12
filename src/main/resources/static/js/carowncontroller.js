start.controller('carown', function($scope, $ionicHistory,$state,$ionicModal,$ionicListDelegate,$http,$ionicLoading) {
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