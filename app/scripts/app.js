'use strict';
/**
 * @ngdoc overview
 * @name toDoListApp
 * @description
 * # toDoListApp
 *
 * Main module of the application.
 */
angular.module('toDoListApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'views/main.html' }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);