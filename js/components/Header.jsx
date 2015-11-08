'use strict';

var React = require('react');
var TodoTextInput = require('./TodoTextInput.jsx');

var TodoActions = require('../actions/TodoActions');

module.exports = React.createClass({
	render: function() {
		return (
			<header className="header">
				<h1 className="header__title">TodoApp</h1>
				<TodoTextInput
					className="header__input"
					id='new-todo'
					placeholder='What needs to be done?'
					onSave={this._onSave}
				/>
			</header>
		);
	},

	_onSave: function(text) {
		if (text.trim()) {
			TodoActions.create(text);
		}
	}
});
