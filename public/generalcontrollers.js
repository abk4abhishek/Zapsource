zapp.controller('HomeController', function($scope, $document,MyGetService) {
          $scope.redbox1 = function () {
              MyGetService.runitforallroute();
           };

    });


zapp.controller('headerController', function($scope,$window,$rootScope,MyGetService,$timeout,$location) {

            $scope.initmyheader=function(){
              $scope.accountbalance=MyGetService.getMyUserBalance();
              MyGetService.runitforallroute();
            }

            $scope.closingsidenav=function(){
              $('#sidenav-overlay').remove();
            }

            $scope.isloggedin=function(){
              return MyGetService.getMyLoggedinstatus();
            }
            $scope.isroleR=function(){
              var role=MyGetService.getMyRole();
              if(role=='recruiter'){
                return true;
              }else{
                return false;
              }
            }

            $scope.isroleA=function(){
              var role=MyGetService.getMyRole();
              if(role=='jobadmin'){
                return true;
              }else{
                return false;
              }
            }
            $scope.logout=function(){
              delete $window.sessionStorage.mytoken;
              delete $window.sessionStorage.myrole;
              MyGetService.clearMy();
              $timeout(function(){$location.path("/");}, 1000);
            }

         });



// Controller function and passing $http service and $scope var.
zapp.controller('loginusercontroller', function($scope, $location,$http,$window,MyGetService,API_baseUrl) {
          $scope.initmypage=function(){
            MyGetService.runitforallroute();
          }

          $scope.loginuser = function () {
              var data = $.param({
                   email: $scope.email,
                   password: $scope.password
               });

               var config = {
                   headers : {
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               }

               $http.post(API_baseUrl+'authenticate', data, config)
               .success(function (data, status, headers, config) {
                 if(status==200){
                    $window.sessionStorage.setItem("mytoken",data.token);
                    $window.sessionStorage.setItem("myrole",data.role);
                    MyGetService.MyGetUser();
                   $location.path("/");
                 }else{
                   $scope.calldata=data;
                   Materialize.toast($scope.calldata.message, 4000);
                 }
               })
               .error(function (data, status, header, config) {
                   $scope.ErResponseDetails = "Data: " + data;
                       console.log($scope.calldata.message);
               });
           };

    });



zapp.controller('addusercontroller', function($scope, $location,$http,$window,$timeout,API_baseUrl,MyGetService){
          $scope.initmypage=function(){
            MyGetService.runitforallroute();
          }

          $scope.adduser = function () {
              // use $.param jQuery function to serialize data from JSON
               var data = $.param({
                   first_name: $scope.first_name,
                   last_name: $scope.last_name,
                   phone: $scope.phone,
                   email: $scope.email,
                   password: $scope.password
               });

               var config = {
                   headers : {
                       'Content-Type': 'application/x-www-form-urlencoded'
                   }
               }

               $http.post(API_baseUrl+'opi/user/', data, config)
               .success(function (data, status, headers, config) {
                 if(status==200){
                    $scope.calldata=data;
                    Materialize.toast($scope.calldata.message, 2000);
                    $timeout(function(){
                      $location.path("/login");
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
           };

    });

zapp.controller('currentopeningsController', function($scope, $location,$http,API_baseUrl,MyGetService,Footer_Email_forApply) {


          $scope.getcurrentopenings = function () {
              MyGetService.runitforallroute();
              $scope.zapapplyemail=Footer_Email_forApply;
               $http.get(API_baseUrl+'opi/job/bystatus/active')
               .success(function (data, status, headers, config) {
                   if(status==200){
                     $scope.currentopeningsdata = data;
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




zapp.controller('viewJobController', function($scope, $location,$http,$routeParams,API_baseUrl,MyGetService,Footer_Email_forApply) {

        $scope.getjobsbyid = function () {
            $scope.zapapplyemail=Footer_Email_forApply;
            MyGetService.runitforallroute();

             $http.get(API_baseUrl+'opi/job/bystatusandid/active/'+$routeParams.job_id)
             .success(function (data, status, headers, config) {
               if(status==200){
                 $scope.user = data;
               }else{
                  $location.path("/norecordfound");
               }
             })
             .error(function (data, status, header, config) {
                 $scope.ErResponseDetails = "Data: " + data;
                     console.log($scope.ErResponseDetails);
             });
         };

});
