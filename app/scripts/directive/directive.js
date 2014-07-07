'use strict';
var app = angular.module('toDoListApp');
app.directive('todoRating', [ function () {
  return {
    restrict: 'EA',
    templateUrl: 'views/selectBox.html',
    replace: true,
    require: 'ngModel',
    transclude: true,
    scope: true,
    controller: function ($scope) {
      this.list  = $scope.$parent.item;
    },
    link: function (scope, ctrl) {
      scope.hovers = 0;
      scope.voted = [];
      scope.rating = scope.item.rating;
      scope.hovered = function (hovers) {
        scope.hovers = hovers;
      };

      scope.change = function (value) {
        scope.item.voted.push(value);
      };
      ctrl.$render = function () {
        scope.value = ctrl.$viewValue;
        scope.value1 = 'foooo';
        console.log(scope.value);
      };
    }
  };
}]);

app.directive('ratingAverage', [function () {
  return {
    require: 'todoRating',
    restrict: 'EAC',
    link: function ($scope) {
      $scope.len = $scope.$parent.item.voted.length;
      $scope.total = parseInt($scope.$parent.item.voted.reduce(function (pv, cv) { return pv + cv; }, 0) / $scope.len, 10);
      $scope.$parent.item.rating = $scope.total;
    }
  };
}]);
