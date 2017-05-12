start.controller('adminrolemaintenance', function($scope,$ionicPopup,$http,$ionicLoading) {
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