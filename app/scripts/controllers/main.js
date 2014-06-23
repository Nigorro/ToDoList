'use strict';

function TodoController($scope, $cookieStore){
	$scope.tab = 1;
	$scope.isError = false;

	$scope.todoList = $cookieStore.get('todoList');
	$scope.removeTodoList = $cookieStore.get('removeTodoList');
	
	//hash generator for id
	var hash = function(s){
		var n;
		if (typeof(s) == 'number' && s === parseInt(s, 10)){
			s = Array(s + 1).join('x');
		}
		return s.replace(/x/g, function(){
			var n = Math.round(Math.random() * 61) + 48;
			n = n > 57 ? (n + 7 > 90 ? n + 13 : n + 7) : n;
			return String.fromCharCode(n);
		});
	}

	// $scope.todoList = [
	// 	{id:'3uONGXcgkKk9i3Yh', text:'Помой кота', isDone:false, rating: 5, voted: [4,5,2,1,4,5]},
	// 	{id:'EP7282HRMLbLKiYq', text:'Погуляй с котом', isDone:false, rating: 1,  voted: [1,2,2,2,2]},
	// 	{id:'LfNhES4KM1eUNHFI', text:'Покорми кота', isDone:false, rating: 3,  voted: [1,4,5,2,1,2,4,5]},
	// 	{id:'GtM5hvVjX8WqGLnI', text:'Поиграй с котом', isDone:false, rating: 1,  voted: [1,1,1,1,1,1,1,1,1,1]}
	// ];

	// $scope.removeTodoList = [
	// 	{id:'RnDL5Xz5oiZqRT9t', text:'Помолиться за кота', isDone:false, rating: 5, voted: [4,5,2,1,4,5]},
	// 	{id:'POqOmaed7P8DNEoE', text:'Погонять  с кота', isDone: true, rating: 1,  voted: [1,1,1,1,1,1,1,1,1,1]},
	// ];

	// $scope.todoList = $cookieStore.put('todoList', $scope.todoList);
	// $scope.removeTodoList = $cookieStore.put('removeTodoList', $scope.removeTodoList);

	$scope.addToDo = function(){
		if($scope.todoText.length > 0){
			$scope.isError = false;
			$scope.todoList.unshift({id:hash(16), text: $scope.todoText, isDone: false, voted: []});
			$cookieStore.put('todoList', $scope.todoList);
			$scope.todoText='';
		}else{
			$scope.isError = true;
		}
		
	};

	$scope.deleteTodo = function(item){
		$scope.removeTodoList.unshift(item);
		$cookieStore.put('removeTodoList', $scope.removeTodoList);
		$scope.todoList.splice(item, 1);
		$cookieStore.put('todoList', $scope.todoList);


	}
	$scope.restoreTodo = function(item){
		$scope.todoList.unshift(item);
		$cookieStore.put('todoList', $scope.todoList);
		$scope.removeTodoList.splice(item,1);
		$cookieStore.put('removeTodoList', $scope.removeTodoList);
	}

	$scope.doneTodo = function(item){
		if(!item.isDone){
			$scope.todoList.push(item);
			$scope.todoList.splice(item,1);
			console.log(item.$hashKey);
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

