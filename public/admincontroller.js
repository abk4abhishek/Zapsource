


zapp.controller('adminDashboardController', function($scope, $location,$http,API_baseUrl, MyGetService) {
    $scope.getallopenings = function () {
            MyGetService.runitforallroute();
            $scope.accountbalance=MyGetService.getMyUserBalance();
        $http.get(API_baseUrl+'api/job/jobs/')
        .success(function (data, status, headers, config) {
            if(status==200){
              $scope.allopendata = data;
            }else{
              $scope.calldata=data;
              Materialize.toast($scope.calldata.message, 4000);
            }
        })
        .error(function (data, status, header, config) {
            $scope.ErResponseDetails = "Data: " + data;
            console.log($scope.ErResponseDetails);
        });


     };
});


zapp.controller('adminViewPostController', function($scope, $location,$http,$routeParams,MyGetService,API_baseUrl,$timeout) {


          $scope.getsubmittedjobs = function () {
              MyGetService.runitforallroute();

               $http.get(API_baseUrl+'api/job/job/byid/'+$routeParams.job_id)
               .success(function (data, status, headers, config) {

                  if(status==200){
                    $scope.user = data;
                  $scope.isButtonActive();
                  }else{
                     $location.path("/norecordfound");
                  }
               })
               .error(function (data, status, header, config) {
                   $scope.ErResponseDetails = "Data: " + data;
                    console.log($scope.ErResponseDetails);
               });
           };
          $scope.editthisjob=function(){
            $location.path("/aeditpost/"+$routeParams.job_id);
          }
          $scope.activatethisjob=function(){
            // use $.param jQuery function to serialize data from JSON
             var data = $.param({
                 job_status: "active",
                 job_notes:"Job is Active",
             });
             var config = {
                 headers : {
                     'Content-Type': 'application/x-www-form-urlencoded'
                 }
             }

             $http.put(API_baseUrl+'api/job/job/status/'+$routeParams.job_id, data, config)
             .success(function (data, status, headers, config) {
                 if(status==200){
                    $scope.calldata=data;
                    Materialize.toast($scope.calldata.message, 2000);
                    $timeout(function(){
                      $location.path("/adashboard/");
                    },2000);
                 }else{
                   $scope.calldata=data;
                   Materialize.toast($scope.calldata.message, 4000);
                 }

             })
             .error(function (data, status, header, config) {
                 $scope.ErResponseDetails = "Data: " + data;
                console.log($scope.ErResponseDetails);
             });
          }

          $scope.disablethisjob=function(){
            // use $.param jQuery function to serialize data from JSON
             var data = $.param({
                 job_status: "disabled",
                 job_notes:"Job is Disabled",
             });
             var config = {
                 headers : {
                     'Content-Type': 'application/x-www-form-urlencoded'
                 }
             }

             $http.put(API_baseUrl+'api/job/job/status/'+$routeParams.job_id, data, config)
             .success(function (data, status, headers, config) {
               if(status==200){
                  $scope.calldata=data;
                  Materialize.toast($scope.calldata.message, 2000);
                  $timeout(function(){
                    $location.path("/adashboard/");
                  },2000);
               }else{
                 $scope.calldata=data;
                 Materialize.toast($scope.calldata.message, 4000);
               }
             })
             .error(function (data, status, header, config) {
               $scope.ErResponseDetails = "Data: " + data;
              console.log($scope.ErResponseDetails);
             });
          }

          $scope.isButtonActive=function(){
            if($scope.user.job_status=="active"){
              $scope.activebutton=false;
            }else{
              $scope.activebutton=true;
            }
          }
});


  zapp.controller('adminEditPostController', function($scope,$route, $location,$http,$routeParams,MyGetService,API_baseUrl,$timeout) {

              $scope.getthisjobbyid = function () {
                  MyGetService.runitforallroute();
                   $http.get(API_baseUrl+'api/job/job/byid/'+$routeParams.job_id)
                   .success(function (data, status, headers, config) {
                       if(status==200){
                          $scope.user=data;
                       }else{
                         $location.path("/norecordfound");
                       }

                   })
                   .error(function (data, status, header, config) {
                     $scope.ErResponseDetails = "Data: " + data;
                    console.log($scope.ErResponseDetails);
                   });
               };
              $scope.resetpage=function(){
                $route.reload();
              }

              $scope.updatethisjob = function () {
                var data = $.param({
                  job_title: $scope.user.job_title,
                  job_description: $scope.user.job_description,
                  job_company: $scope.user.job_company,
                  job_salary: $scope.user.job_salary,
                  job_mandatoryskills:$scope.user.job_mandatoryskills,
                  job_preferredskills:$scope.user.job_preferredskills,
                  job_experience: $scope.user.job_experience,
                  job_category: $scope.user.job_category,
                  job_education: $scope.user.job_education,
                  job_street:$scope.user.job_street,
                  job_city: $scope.user.job_city,
                  job_state: $scope.user.job_state,
                  job_country: $scope.user.job_country,
                  job_postalcode: $scope.user.job_postalcode,
                  job_domain: $scope.user.job_domain,
                  job_otherdetails: $scope.user.job_otherdetails
                });
                var config = {
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                $http.put(API_baseUrl+'api/job/job/'+$routeParams.job_id, data, config)
                .success(function (data, status, headers, config) {
                  if(status==200){
                     $scope.calldata=data;
                     Materialize.toast($scope.calldata.message, 2000);
                     $timeout(function(){
                       $location.path("/aviewpost/"+$routeParams.job_id);
                     },2000);
                  }else{
                    $scope.calldata=data;
                    Materialize.toast($scope.calldata.message, 4000);
                  }
                })
                .error(function (data, status, header, config) {
                  $scope.ErResponseDetails = "Data: " + data;
                 console.log($scope.ErResponseDetails);
                });
             }

});




/// Users Controllers





zapp.controller('adminManageUsersController', function($scope, $location,$http,MyGetService,API_baseUrl) {
    $scope.getAllUsers = function () {
          MyGetService.runitforallroute();
         $http.get(API_baseUrl+'api/user/users/')
         .success(function (data, status, headers, config) {
             if(status==200){
               $scope.allusersdata = data;
             }else{
               $scope.calldata=data;
               Materialize.toast($scope.calldata.message, 4000);
             }
         })
         .error(function (data, status, header, config) {
           $scope.ErResponseDetails = "Data: " + data;
          console.log($scope.ErResponseDetails);
         });
     };
});





  zapp.controller('adminUpdateUserController', function($scope,$route, $location,$http,$routeParams,MyGetService,API_baseUrl, $timeout) {

              $scope.getUserforUpdate = function () {
                  MyGetService.runitforallroute();
                   $http.get(API_baseUrl+'api/user/user/'+$routeParams.email)
                   .success(function (data, status, headers, config) {
                       if(status==200){
                          $scope.user=data;
                       }else{
                         $location.path("/norecordfound");
                       }
                   })
                   .error(function (data, status, header, config) {
                     $scope.ErResponseDetails = "Data: " + data;
                    console.log($scope.ErResponseDetails);
                   });
               };
              $scope.resetpage=function(){
                $route.reload();
              }

              $scope.updateUser = function () {
                var data = $.param({
                  first_name : $scope.user.first_name,  // set the user name (comes from the request)
                  last_name:$scope.user.last_name,
                  phone:$scope.user.phone,
                  email:$scope.user.email,
                  //user.password:passwordauth.endcodepass(req.body.password),
                  role:$scope.user.role,
                  account_active:$scope.user.account_active,
                  account_balance:$scope.user.account_balance,
                  account_limit:$scope.user.account_limit
                });
                var config = {
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                $http.put(API_baseUrl+'api/user/user/'+$routeParams.email, data, config)
                .success(function (data, status, headers, config) {
                    if(status==200){
                       $scope.calldata=data;
                       Materialize.toast($scope.calldata.message, 2000);
                       $timeout(function(){
                         $location.path("/amanageusers");
                       },2000);
                    }else{
                      $scope.calldata=data;
                      Materialize.toast($scope.calldata.message, 4000);
                    }
                })
                .error(function (data, status, header, config) {
                  $scope.ErResponseDetails = "Data: " + data;
                 console.log($scope.ErResponseDetails);
                });
             }

});
