'use strict';
angular.module('toDoListApp')
  .controller('TodoController', [function ($scope, $cookieStore) {
    $scope.tab = 1;
    $scope.showComment = false;
    $scope.isError = false;
    $scope.todoList = $cookieStore.get('todoList');
    $scope.removeTodoList = $cookieStore.get('removeTodoList');
    $scope.todoComments = $cookieStore.get('todoComments');
    $scope.$watch('todoComments', function () {
      $cookieStore.put('todoComments', $scope.todoComments);
    }, true);
    $scope.$watch('todoList', function () {
      $cookieStore.put('todoList', $scope.todoList);
    }, true);
    $scope.$watch('removeTodoList', function () {
      $cookieStore.put('removeTodoList', $scope.todoList);
    }, true);


    // //hash generator for id
    var hash = function (s) {
      if (typeof s === 'number' && s === parseInt(s, 10)) {
        s = (function (length) { var array = []; array.length = length; return array; }(s).join('x'));

      }
      return s.replace(/x/g, function () {
        var n = Math.round(Math.random() * 61) + 48;
        n = n > 57 ? (n + 7 > 90 ? n + 13 : n + 7) : n;
        return String.fromCharCode(n);
      });
    };

    // $scope.todoList = [
    //  {id:'3uONGXcgkKk9i3Yh', text:'Помой кота', isDone:false, rating: 5, voted: [4,5,2,1,4,5]},
    //  {id:'EP7282HRMLbLKiYq', text:'Погуляй с котом', isDone:false, rating: 1,  voted: [1,2,2,2,2]},
    //  {id:'LfNhES4KM1eUNHFI', text:'Покорми кота', isDone:false, rating: 3,  voted: [1,4,5,2,1,2,4,5]},
    //  {id:'GtM5hvVjX8WqGLnI', text:'Поиграй с котом', isDone:false, rating: 1,  voted: [1,1,1,1,1,1,1,1,1,1]}
    // ];

    // $scope.removeTodoList = [
    //  {id:'RnDL5Xz5oiZqRT9t', text:'Помолиться за кота', isDone:false, rating: 5, voted: [4,5,2,1,4,5]},
    //  {id:'POqOmaed7P8DNEoE', text:'Погонять  с кота', isDone: true, rating: 1,  voted: [1,1,1,1,1,1,1,1,1,1]},
    // ];

    // $scope.todoComments = [
    //  {id:'KP1rjwumUoxBNQEYchyg', author:'Nigorro', text:'Великолепный ресурс! спасибо создателям!', rating: 5, voted: [4,5,2,1,4,5], date : new Date()},
    //  {id:'KtLsyt9yj4M6ECsujUmb', author:'Impy', text:'Великолепный ресурс! спасибо создателям!',  rating: 1,  voted: [1,2,2,2,2], date : new Date()},
    //  {id:'D0PpFw3dH3XgtvMaYBGp', author:'Black_Master', text:'Великолепный ресурс! спасибо создателям!', rating: 3,  voted: [1,4,5,2,1,2,4,5], date : new Date()},
    //  {id:'2NJ92Y47TdYcGI7Ag8Ns', author:'*666_Pro100_Vasia_999*', text:'Да фигня, крайзис лучше пацаны!', rating: 1,  voted: [1,1,1,1,1,1,1,1,1,1], date : new Date()},
    // ];

    // $scope.todoList = $cookieStore.put('todoList', $scope.todoList);
    // $scope.removeTodoList = $cookieStore.put('removeTodoList', $scope.removeTodoList);
    // $scope.todoComments = $cookieStore.put('todoComments', $scope.todoComments);

    $scope.addToDo = function () {
      if ($scope.todoText.length > 0) {
        $scope.isError = false;
        $scope.todoList.unshift({id: hash(32), text: $scope.todoText, isDone: false, rating: 0, voted: []});
        $scope.todoText = '';
      } else {
        $scope.isError = true;
      }
    };

    $scope.deleteTodo = function (item) {
      $scope.removeTodoList.unshift(item);
      $scope.todoList.splice(item, 1);
    };

    $scope.restoreTodo = function (item) {
      $scope.todoList.unshift(item);
      $scope.removeTodoList.splice(item, 1);
    };

    $scope.doneTodo = function (item) {
      if (!item.isDone) {
        $scope.todoList.push(item);
        $scope.todoList.splice(item, 1);
      }
    };

    $scope.addComment = function () {
      $scope.ratingg = 0;
      $scope.todoComments.unshift({id: hash(32), author: $scope.commentAuthor, text: $scope.commentText, rating: 0, voted: [], date : new Date()});
      $scope.commentAuthor = '';
      $scope.commentText = '';
    };
  }]);
