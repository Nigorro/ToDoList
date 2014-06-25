'use strict';

app.directive('todoRating',['$cookieStore', function($cookieStore){
	return {
		restrict:'EA',
		templateUrl: 'views/selectBox.html',
		replace: true,
		require: 'ngModel',
		transclude: true,
		scope: true,
		controller: function($scope, $element, $attrs) {
	    	this.list  = $scope.$parent.item;
	    },
		
		link:function(scope, element, attrs, ctrl){
			scope.hovers = 0;
			scope.voted = [];

			scope.hovered = function(hovers) {
				scope.hovers = hovers;
			}

			scope.change = function(value) {
				scope.item.voted.push(value);
			}

			ctrl.$render = function() {
				scope.value = ctrl.$viewValue;
			}

			var find = function(array, find){
				for(var i = 0; i < array.length; i++){
					if(array[i].id == find){
						return array[i];
					}
				}
			}
		}
	}
}]);

app.directive('ratingAverage',['$cookieStore', function($cookieStore){
	return {
		restrict:'EAC',
		require: '^todoRating',
		link:function(scope, element, attrs, todoRatingCtrl){
			scope.arrayLen = todoRatingCtrl.list.voted.length;
			scope.total = parseInt(todoRatingCtrl.list.voted.reduce(function(pv, cv) { return pv + cv; }, 0)/scope.arrayLen);
			todoRatingCtrl.list.rating = scope.total ;
		}
	}
}]);
