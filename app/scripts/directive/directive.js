'use strict';


app.directive('todoRating',['$cookieStore', function($cookieStore){
	return {
		restrict:'EA',
		templateUrl: 'views/selectBox.html',
		replace: true,
		require: 'ngModel',
		controller:  function(){
			this.printLog = function(message){
				console.log('Print Message: ' + message);
			}
		},
		

		link:function(scope, element, attrs, ctrl){
			scope.hovers = 0;
			scope.voted = [];

			scope.hovered = function(hovers) {
				scope.hovers = hovers;
			}

			scope.change = function(value) {
				scope.value = value;
				if(undefined !== $cookieStore.get(scope.$id)){
					scope.voted = $cookieStore.get(scope.$id);
				}
				var findElment = find(scope.todoList, scope.$parent.item.id)
				console.log(findElment);
				scope.todoList.slice(findElment.voted.push(value));
				$cookieStore.put('todoList', scope.todoList);
				
				ctrl.$setViewValue(value);
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
		restrict:'EA',
		// template:'<span>Рейтинг: {{average}}</span>}',
		replace: true,
		transclude: true,
		require: 'todoRating',
		link:function(scope, element, attrs, todoRatingCtrl){
			todoRatingCtrl.printLog('poo foo');
			// scope.index = scope.$parent.$index;
			// scope.array = scope.$parent.$parent.todoList[scope.index].voted;
			// scope.arrayLen = scope.$parent.$parent.todoList[scope.index].voted.length
		 // 	scope.average = scope.$parent.$parent.todoList.rating = parseInt(scope.array.reduce(function(pv, cv) { return pv + cv; }, 0)/scope.arrayLen);
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