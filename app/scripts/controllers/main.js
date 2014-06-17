'use strict';

function TodoController($scope, $cookieStore){
	$scope.tab = 1;

	$scope.isError = false;

	$scope.todoList = [
		{text:'Помой кота', isDone:false, rating: 5, voted: [{count: 4},{count: 4},{count: 3}]},
		{text:'Погуляй с котом', isDone:false, rating: 1,  voted: [{count: 4},{count: 4},{count: 3}]},
		{text:'Покорми кота', isDone:false, rating: 3,  voted: [{count: 4},{count: 4},{count: 3}]},
		{text:'Поиграй с котом', isDone:false, rating: 1,  voted: [{count: 4},{count: 4},{count: 3}]}
	];

	$scope.removeTodoList = [
		{text:'Помолиться за кота', isDone:false},
		{text:'Погонять  с кота', isDone: true},
	];


	$scope.addToDo = function(){
		if($scope.todoText.length > 0){
			$scope.isError = false;
			$scope.todoList.unshift({text:$scope.todoText, isDone: false});
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

