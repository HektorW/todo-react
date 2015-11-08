'use strict';

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var TodoItem = require('./TodoItem.jsx');


module.exports = React.createClass({
	render: function() {

		var allTodos = this.props.allTodos;
		var todos = [];
		for (var key in allTodos) {
			todos.push(<TodoItem key={key} todo={allTodos[key]} />);
		}

		return (
			<section id="main">
				<ul className="todo-list">
					<ReactCSSTransitionGroup transitionName="todo-item" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
						{todos}
					</ReactCSSTransitionGroup>
				</ul>
			</section>
		);
	}
});
