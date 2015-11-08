
var React = require('react');
var ReactDOM = require('react-dom');

var TodoApp = require('./components/TodoApp.jsx');
var TodoStorage = require('./utils/TodoStorage');

TodoStorage.initialize();

ReactDOM.render(
	<TodoApp />,
	document.getElementById('app')
);
