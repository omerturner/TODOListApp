'use strict';

angular.module('todoListApp')
.service('dataService', function($http) {

  this.getTodos = function(callback){
    $http.get('/api/todos/all')
    .then(callback)
  };

  this.deleteTodo = function(todo) {
    $http({
      method: 'POST',
      url: '/api/todos/delete',
      data: todo
    }).then(function successCallback(response) {
        console.log(todo.name + " has been deleted!");
      }, function errorCallback(response) {
        console.log("error deleting " + todo.name);
      });
  };

  this.saveTodo = function(todo, completed) {
    $http({
      method: 'POST',
      url: '/api/todos/create',
      data: todo
    }).then(function successCallback(response) {
        console.log(todo.name + " has been saved!");
      }, function errorCallback(response) {
        console.log("error saving " + todo.name);
      });
  };

});