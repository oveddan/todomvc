/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	app.TodoList = React.createClass({
	
		shownToDos: function() {
		},

		noTodosChecked: function() {
			return _.every(this.props.todos, function(todo) {
				return !todo.get('completed');
			});
		},

		toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.todos.forEach(function (todo) {
				todo.set('completed', checked);
			});
		},

		render: function() {
			var todoItems = this.props.todos.map(function (todo) {
				return (
					<TodoItem
						todo={todo}
					/>
				);
			});

			return (
				<section id="main">
						<input
							id="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={this.noTodosChecked}
						/>
					<ul id="todo-list">
				  	{todoItems}
				  </ul>
			 </section>
			)
		}
	});
})();

