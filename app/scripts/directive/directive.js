'use strict';


app.directive('todoRating',['$cookieStore', function($cookieStore){
	return {
		restrict:'EA',
		templateUrl: 'views/selectBox.html',
		replace: true,
		require: 'ngModel',
		scope: true,


		link:function(scope, element, attrs, ctrl){
			scope.hovers = 0;
			scope.voted = [];

			scope.hovered = function(hovers) {
				scope.hovers = hovers;
			}

			scope.change = function(value) {
				scope.value = value;
				scope.rating = scope.value;
				if(undefined !== $cookieStore.get(scope.$id)){
					scope.voted = $cookieStore.get(scope.$id);
				}
				scope.voted.push(value);
				$cookieStore.put(scope.$id, scope.voted);
				console.log($cookieStore.get(scope.$id));
				
				ctrl.$setViewValue(value);
			}

			ctrl.$render = function() {
				scope.value = ctrl.$viewValue;
			}
		}
	}
}]);

app.directive('todoRatingAverage',['$cookieStore', function($cookieStore){
	return {
		restrict:'EA',
		template: '<h1>средний рейтинг</h1>',
		replace: true,
		require: 'ngModel',
		scope: true,


		link:function(scope, element, attrs, ctrl){
			
		}
	}
}]);


// app.directive('todoRatingWatch',[function(){
// 	return {
// 		restrict:'EA',
// 		templateUrl: 'views/selectBox.html',
// 		replace: true,
// 		scope: {
// 			'ngModel': '='
// 		},

// 		link: function (scope, element, attrs) {
// 			scope.change = function (value) {
// 				scope.ngModel = value;
// 			}
// 		}
// 	}
// }]);


// app.directive('tController', [
// 	function () {
// 		return {
// 			restrict: 'A',
// 			controller: '@'
// 		};
// 	}
// ]);