start.controller('login', function($scope,$http,$state,$ionicPopup,$ionicLoading,$ionicPopover) {
	$scope.customer = {
			  username:"",
			  password:""
	};
	
	$scope.onsubmit = function (){  
		  $ionicLoading.show({
		    	 template: ' <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'+
		            '<p>Loging in ...</p>',
		          animation: 'fade-in',
		          noBackdrop: false,
		          maxWidth: 500,
		          showDelay: 0
		  });
		  
		  $http.post('/loginhere', JSON.stringify($scope.customer)).then(function (data) {
			  	  console.log(data);
			  	  if(data.data.loggedIn == true){
			  		  console.log("logged in");
			  		  window.location.href = '/homepage';
			  	  }else{
				       var alertPopup = $ionicPopup.alert({
				           title: 'Error',
				           template: 'Wrong log in credentials!'
				        });

				        alertPopup.then(function(res) {
				        	//to do
				        });
			  	  }
		  }, function (data) {
				  console.log(data);
		  }).finally(function() {
				    // called no matter success or failure
			  $ionicLoading.hide();
		  });		  
	};
})