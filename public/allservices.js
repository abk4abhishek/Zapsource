zapp.factory('myauthintro',function ($location, $window,$q) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.getItem("mytoken")) {
                        config.headers.Authorization = $window.sessionStorage.getItem("mytoken");;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
});

zapp.run(function($rootScope,$location,$window,MyGetService){

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
              var token=$window.sessionStorage.getItem("mytoken");
              var role=$window.sessionStorage.getItem("myrole");
            if(next.requireLogin && !token) {
                    Materialize.toast("You need to be authenticated to see this page!", 5000);
                    event.preventDefault();
                    if ( next.templateUrl === "views/login.html") {
                    } else {
                      $location.path("/login");
                    }

            }
            if(next.requiredRole !=role  && next.requireLogin){
                    Materialize.toast("You need to be authorized to see this page!",5000);
                    event.preventDefault();
                    if ( next.templateUrl === "views/home.html") {
                    } else {
                      $location.path("/");
                    }
            }

    });
    MyGetService.MyGetUser();
});



zapp.service('MyGetService',function($http,$window,$rootScope,API_baseUrl){
var MyLoggedinFlag=false;
var MyGetData={};
var MyCurrentUser={};
var UserBalance;
var UserRole="None";
var ErResponseDetails={};
var UserLimited=false;

    this.MyGetUser=function(){
        var token=$window.sessionStorage.getItem('mytoken');
        if(token){
          $http.get(API_baseUrl+'api/user/usercon/')
          .success(function (data, status, headers, config) {
              MyGetData = data;
              MyLoggedinFlag=true;
              MyCurrentUser=data.currentUser;
              UserBalance=data.currentUser.account_balance;
              UserRole=data.currentUser.role;
              UserLimited=data.currentUser.account_limit;
          })
          .error(function (data, status, header, config) {
              ErResponseDetails = "Data: " + data;
                  console.log("Error is "+ErResponseDetails);
          });

        }else{
          //console.log("User is not logged in yet");
        }
      }


    this.getMyRole=function(){
      return UserRole;
    }

    this.getMyUserBalance=function(){
      return UserBalance;
    }

    this.getMyUserLimit=function(){
      return UserLimited;
    }

    this.getMyJobStatusList=function(){
      return MyGetData.statuslist;
    }
    this.getMyCurrentEmail=function(){
      return MyCurrentUser.email;
    }

    this.getMyLoggedinstatus=function(){
      var token=$window.sessionStorage.getItem('mytoken');
      if(token){
        MyLoggedinFlag=true;
        return MyLoggedinFlag;
      }else{
        return MyLoggedinFlag;
      }
    }

    this.clearMy=function(){
      MyLoggedinFlag=false;
      MyGetData={};
      MyCurrentUser={};
      UserBalance="";
      UserRole="None";
      ErResponseDetails={};
      UserLimited=false;
    }

    this.runitforallroute=function(){
      $( document ).ready(function(){
        $('.parallax').parallax();
         $('select').material_select();
      });
    }

});
