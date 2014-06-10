'use strict';

/**
 * @ngdoc function
 * @name toDoListApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the toDoListApp
 */
angular.module('toDoListApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
