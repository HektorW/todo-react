
var Footer = require('./Footer.jsx');
var Header = require('./Header.jsx');
var MainSection = require('./MainSection.jsx');
var React = require('react');
var TodoStore = require('../stores/TodoStore');


function getTodoState() {
	return {
		allTodos: TodoStore.getAll()
	};
}

module.exports = React.createClass({

	getInitialState: function() {
		return getTodoState();
	},


	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		TodoStore.removeChangeListener(this._onChange);
	},

	render: function() {
		return (
			<section className="todo-app">
				<Header />
				<MainSection allTodos={this.state.allTodos} />
				<Footer allTodos={this.state.allTodos}/>
			</section>
		);
	},

	_onChange: function() {
		this.setState(getTodoState());
	}
});