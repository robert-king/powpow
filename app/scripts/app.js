'use strict';

angular
  .module('kbCliApp', [
//    'ngCookies',
//    'ngResource',
//    'ngSanitize',
    'ngRoute',
    'firebase',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
