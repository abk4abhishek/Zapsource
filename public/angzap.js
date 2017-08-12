
var zapp = angular.module("zapp", ['ngRoute']);

// zapp.constant('API_baseUrl', "http://zapsourcing.com/");
zapp.constant('API_baseUrl', "http://localhost:3000/");
zapp.constant('Footer_Email_forApply',"zapadmin@zapsourcing.com");
zapp.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider,$httpProvider) {
   $routeProvider

   .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController',
      requireLogin: false,
      requiredRole:"None"
   })
   .when('/services', {
      templateUrl: 'views/extra.html',
      //controller: 'AddStudentController',
      requireLogin: false,
      requiredRole:"None"
   })
   .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginusercontroller',
      requireLogin: false,
      requiredRole:"None"
   })
   .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'addusercontroller',
      requireLogin: false,
      requiredRole:"None"
   })
   .when('/currentopenings', {
      templateUrl: 'views/currentopenings.html',
      controller: 'currentopeningsController',
      requireLogin: false,
      requiredRole:"None"
   })
   .when('/viewjob/:job_id', {
      templateUrl: 'views/viewjob.html',
      controller: 'viewJobController',
      requireLogin: false,
      requiredRole:"None"
   })
   .when('/newpost', {
      templateUrl: 'views/newpost.html',
      controller: 'addjobcontroller',
      requireLogin: true,
      requiredRole:"recruiter"
   })
   .when('/rdashboard', {
      templateUrl: 'views/rdashboard.html',
      controller: 'recruiterDashboardController',
      requireLogin: true,
      requiredRole:"recruiter"
   })
   .when('/rviewpost/:job_id', {
      templateUrl: 'views/rviewpost.html',
      controller: 'recruiterViewPostController',
      requireLogin: true,
      requiredRole:"recruiter"
   })
   .when('/reditpost/:job_id', {
      templateUrl: 'views/reditpost.html',
      controller: 'recruiterEditPostController',
      requireLogin: true,
      requiredRole:"recruiter"
   })
   .when('/adashboard', {
      templateUrl: 'views/adashboard.html',
      controller: 'adminDashboardController',
      requireLogin: true,
      requiredRole:"jobadmin"
   })
   .when('/aviewpost/:job_id', {
      templateUrl: 'views/aviewpost.html',
      controller: 'adminViewPostController',
      requireLogin: true,
      requiredRole:"jobadmin"
   })
   .when('/aeditpost/:job_id', {
      templateUrl: 'views/aeditpost.html',
      controller: 'adminEditPostController',
      requireLogin: true,
      requiredRole:"jobadmin"
   })
   .when('/amanageusers/', {
      templateUrl: 'views/amanageusers.html',
      controller: 'adminManageUsersController',
      requireLogin: true,
      requiredRole:"jobadmin"
   })
   .when('/aupdateuser/:email', {
      templateUrl: 'views/aupdateuser.html',
      controller: 'adminUpdateUserController',
      requireLogin: true,
      requiredRole:"jobadmin"
   })
   .when('/norecordfound', {
      templateUrl: 'views/norecordfound.html',
      //controller: 'adminUpdateUserController',
      requireLogin: false,
      requiredRole:"None"
   })
   .otherwise({
      redirectTo: '/'
   });

   $locationProvider.html5Mode(true);

   $httpProvider.interceptors.push('myauthintro');

}]);
