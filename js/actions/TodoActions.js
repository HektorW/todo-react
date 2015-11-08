
var TodoAppDispatcher = require('../dispatcher/TodoAppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

	restore: function(todo) {
		TodoAppDispatcher.dispatch({
			actionType: TodoConstants.TODO_RESTORE,
			todo: todo
		});
	},

	create: function(text) {
		TodoAppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
	},

	destroy: function(id) {
		TodoAppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		});
	},

	updateText: function(id, text) {
		TodoAppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT,
			id: id,
			text: text
		});		
	},

	toggleComplete: function(todo) {
		TodoAppDispatcher.dispatch({
			actionType: todo.complete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE,
			id: todo.id
		});
	}
};

module.exports = TodoActions;