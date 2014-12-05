/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Backbone */
var app = app || {};

(function () {
	'use strict';

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	var TodoFooter = app.TodoFooter;
	var TodoHeader = app.TodoHeader;
	var TodoList = app.TodoList;
	var TodoItem = app.TodoItem;

	var ENTER_KEY = 13;

	// An example generic Mixin that you can add to any component that should
	// react to changes in a Backbone component. The use cases we've identified
	// thus far are for Collections -- since they trigger a change event whenever
	// any of their constituent items are changed there's no need to reconcile for
	// regular models. One caveat: this relies on getBackboneCollections() to
	// always return the same collection instances throughout the lifecycle of the
	// component. If you're using this mixin correctly (it should be near the top
	// of your component hierarchy) this should not be an issue.
	var BackboneMixin = {
		componentDidMount: function () {
			// Whenever there may be a change in the Backbone data, trigger a
			// reconcile.
			this.getBackboneCollections().forEach(function (collection) {
				// explicitly bind `null` to `forceUpdate`, as it demands a callback and
				// React validates that it's a function. `collection` events passes
				// additional arguments that are not functions
				collection.on('add remove change', this.forceUpdate.bind(this, null));
			}, this);
		},

		componentWillUnmount: function () {
			// Ensure that we clean up any dangling references when the component is
			// destroyed.
			this.getBackboneCollections().forEach(function (collection) {
				collection.off(null, null, this);
			}, this);
		}
	};

	var TodoApp = React.createClass({
		mixins: [BackboneMixin],
		getBackboneCollections: function () {
			return [this.props.todos];
		},

		getInitialState: function () {
			return {editing: null};
		},

		componentDidMount: function () {
			var Router = Backbone.Router.extend({
				routes: {
					'': 'all',
					'active': 'active',
					'completed': 'completed'
				},
				all: this.setState.bind(this, {nowShowing: app.ALL_TODOS}),
				active: this.setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
				completed: this.setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
			});

			new Router();
			Backbone.history.start();

			this.props.todos.fetch();
		},

		componentDidUpdate: function () {
			// If saving were expensive we'd listen for mutation events on Backbone and
			// do this manually. however, since saving isn't expensive this is an
			// elegant way to keep it reactively up-to-date.
			this.props.todos.forEach(function (todo) {
				todo.save();
			});
		},

		render: function () {
			var footer;
			var header;
			var main;
			var todos = this.props.todos;


			main = <TodoList todos={todos} />;

			// var activeTodoCount = todos.reduce(function (accum, todo) {
				// return todo.get('completed') ? accum : accum + 1;
			// }, 0);

			// var completedCount = todos.length - activeTodoCount;

			// if (activeTodoCount || completedCount) {
				// footer = (
					// <TodoFooter todos={todos}
						// count={activeTodoCount}
						// completedCount={completedCount}
						// nowShowing={this.state.nowShowing}
					// />
				// );
			// }

			header = ( <TodoHeader todos={todos} /> ) ; 

			return (
				<div>
					{header}
					{todoList}
					{footer}
				</div>
			);
		}
	});

	React.renderComponent(
		<TodoApp todos={app.todos} />,
		document.getElementById('todoapp')
	);
})();
