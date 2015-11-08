'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;

var TodoTextInput = require('./TodoTextInput.jsx');
var TodoActions = require('../actions/TodoActions');


module.exports = React.createClass({
	
	propTypes: {
		todo: ReactPropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			editing: false
		};
	},

	render: function() {
		var className = 'todo-item' +
						(this.props.todo.complete ? ' todo-item--is-completed' : '') +
						(this.state.editing ? ' todo-item--state-editing' : '');

		var input;
		if (this.state.editing) {
			input = <TodoTextInput
						className="todo-item__input"
						onSave={this._onSave}
						value={this.props.todo.text}
					/>;
		}

		return (
			<li className={className}>
				<input
					className="todo-item__checkbox"
					type="checkbox"
					checked={this.props.todo.complete}
					onChange={this._onToggleComplete}
					/>
				<span className="todo-item__text" onDoubleClick={this._onDoubleClick}>{this.props.todo.text}</span>
				<button className="todo-item__destroy" onClick={this._onDestroyClick}>&#10008;</button>
				{input}
			</li>
		);
	},

	_onDoubleClick: function() {
		this.setState({ editing: true });
	},

	_onDestroyClick: function() {
		TodoActions.destroy(this.props.todo.id);
	},

	_onToggleComplete: function() {
		TodoActions.toggleComplete(this.props.todo);
	},

	_onSave: function(text) {
		TodoActions.updateText(this.props.todo.id, text);
		this.setState({ editing: false });
	}
});