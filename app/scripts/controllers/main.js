'use strict';

function TodoController($scope, $cookieStore){
	$scope.tab = 1;
	$scope.isError = false;

	$scope.todoList = $cookieStore.get('todoList');
	$scope.removeTodoList = $cookieStore.get('removeTodoList');

	$scope.addToDo = function(){
		if($scope.todoText.length > 0){
			$scope.isError = false;
			$scope.todoList.unshift({id:parseInt($scope.todoList[0].id) + 1, text:$scope.todoText, isDone: false});
			$cookieStore.put('todoList', $scope.todoList);
			$scope.todoText='';
		}else{
			$scope.isError = true;
		}
		
	};

	$scope.deleteTodo = function(item){
		$scope.removeTodoList.unshift(item);
		$scope.todoList.splice(item, 1);


	}
	$scope.restoreTodo = function(item){
		$scope.todoList.unshift(item);
		$scope.removeTodoList.splice(item,1);
	}

	$scope.doneTodo = function(item){
		if(!item.isDone){
			$scope.todoList.push(item);
			$scope.todoList.splice(item,1);
			console.log(item.$$hashKey);
		}
	}

}


// var app = angular.module('toDoListApp');

// app.controller('ToDoController', function(){
// 	this.items = listItems; 
// });
// app.controller('ListAddCintroller', function(){
// 	this.list = {};
// 	this.addList = function(listItems) {
// 		listItems.listText.push(listText);
// 	}
// });
// this.listItems = [
// 	{
// 		listText: 'Помыть кота',
// 		isDone: false,
// 	},
// 	{
// 		listText: 'Купить коту поесть',
// 		isDone: false,
// 	},
// 	{
// 		listText: 'Поиграться с котом',
// 		isDone: false,
// 	},
// 	{
// 		listText: 'Сводить кота к парихмахеру',
// 		isDone: false,
// 	},
// ];

