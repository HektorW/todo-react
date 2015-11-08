
var EventEmitter = require('events').EventEmitter;
var TodoAppDispatcher = require('../dispatcher/TodoAppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var CHANGE_EVENT = 'change';

var _todos = {};


function create(text) {
	var id = (Date.now() + Math.floor(Math.random() * 999999)).toString(36);
	_todos[id] = {
		id: id,
		complete: false,
		text: text
	};
}

function update(id, updates) {
	_todos[id] = Object.assign({}, _todos[id], updates);
}

function destroy(id) {
	delete _todos[id];
}

function restore(todo) {
	_todos[todo.id] = todo;
}


var TodoStore = Object.assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _todos;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatcherIndex: TodoAppDispatcher.register(function(payload) {
		var text;

		switch (payload.actionType) {
			case TodoConstants.TODO_CREATE:
				text = payload.text.trim();
				if (text !== '') {
					create(text);
					TodoStore.emitChange();
				}
				break;

			case TodoConstants.TODO_UPDATE_TEXT:
				update(payload.id, { text: payload.text.trim() });
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_DESTROY:
				destroy(payload.id);
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_COMPLETE:
				update(payload.id, { complete: true });
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_UNDO_COMPLETE:
				update(payload.id, { complete: false });
				TodoStore.emitChange();
				break;

			case TodoConstants.TODO_RESTORE:
				restore(payload.todo);
				TodoStore.emitChange();
				break;
		}
	})
});

module.exports = TodoStore;
