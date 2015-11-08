'use strict';

var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');

function load() {
	var todos = window.localStorage.getItem('todos');
	return todos && JSON.parse(todos) || {};
}

function save(todos) {
	window.localStorage.setItem('todos', JSON.stringify(todos));
}


var TodoStorage = {
	initialize: function() {
		var todos = load();
		for (var key in todos) {
			TodoActions.restore(todos[key]);
		}

		TodoStore.addChangeListener(this.onTodoStoreChange);
	},

	onTodoStoreChange: function() {
		save(TodoStore.getAll());
	}
};

module.exports = TodoStorage;