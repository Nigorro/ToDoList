'use strict';

app.directive('todoRating',['$cookieStore', function($cookieStore){
	return {
		restrict:'EA',
		templateUrl: 'views/selectBox.html',
		replace: true,
		require: 'ngModel',
		transclude: true,
		controller:  function(){
			this.average = function(item,scope){
				this.arrayLen = item.voted.length;
				this.total = parseInt(item.voted.reduce(function(pv, cv) { return pv + cv; }, 0)/this.arrayLen);
				scope.item.rating = this.total;
			}
		},
		
		link:function(scope, element, attrs, ctrl){
			scope.hovers = 0;
			scope.voted = [];

			scope.hovered = function(hovers) {
				scope.hovers = hovers;
			}

			scope.change = function(value) {
				if($cookieStore.get(scope.$id)!== undefined){
					scope.voted = $cookieStore.get(scope.$id);
				}
				var findElment = find(scope.todoList, scope.item.id)
				scope.todoList.slice(findElment.voted.push(value));
				$cookieStore.put('todoList', scope.todoList);
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
			todoRatingCtrl.average(scope.item, scope);
		}
	}
}]);