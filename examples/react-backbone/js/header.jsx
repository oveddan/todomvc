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

	var ENTER_KEY = 13;

	app.TodoHeader = React.createClass({
		handleNewTodoKeyDown: function (event) {
			if (event.which !== ENTER_KEY) {
				return;
			}

			var val = this.refs.newField.getDOMNode().value.trim();
			if (val) {
				this.props.todos.create({
					title: val,
					completed: false,
					order: this.props.todos.nextOrder()
				});
				this.refs.newField.getDOMNode().value = '';
			}

			return false;
		},

		render: function () {
			<header id="header">
				<h1>todos</h1>
				<input
					ref="newField"
					id="new-todo"
					placeholder="What needs to be done?"
					onKeyDown={this.handleNewTodoKeyDown}
					autoFocus={true}
				/>
			</header>
		}
	});
});

