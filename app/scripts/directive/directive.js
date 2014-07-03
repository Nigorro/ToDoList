'use strict';
var app =  angular.module('toDoListApp', []);
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

      scope.hovered = function (hovers) {
        scope.hovers = hovers;
      };

      scope.change = function (value) {
        scope.item.voted.push(value);
      };

      ctrl.$render = function () {
        scope.value = ctrl.$viewValue;
      };
    }
  };
}]);

app.directive('ratingAverage', [function () {
  return {
    restrict: 'EAC',
    require: '^todoRating',
    link: function (scope, todoRatingCtrl) {
      scope.arrayLen = todoRatingCtrl.list.voted.length;
      scope.total = parseInt(todoRatingCtrl.list.voted.reduce(function (pv, cv) { return pv + cv; }, 0) / scope.arrayLen, 10);
      todoRatingCtrl.list.rating = scope.total;
    }
  };
}]);
