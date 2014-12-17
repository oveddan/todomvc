/** @jsx React.DOM */

var TestUtils = React.addons.TestUtils;

describe('ToggleAllCheckbox', function() {
  var ToggleAllCheckbox = app.ToggleAllCheckbox;
  var Todos = app.Todos;

  it('is checked when there are no active todos', function(){
    // var todos = new app.Todos([
      // {completed: 'true'},
      // {completed: 'true'},
      // {completed: 'true'}
    // ]);

    var activeTodoCount = 0;

    var checkbox = TestUtils.renderIntoDocument(
      <ToggleAllCheckbox activeTodoCount={activeTodoCount} />
    );

    var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    expect(input.checked).to.be(false);


  });
  it('is not checked when any of the todos are not completed', function(){
  });

  // it(' the text after click', function() {

    // // Render a checkbox with label in the document
    // var checkbox = TestUtils.renderIntoDocument(
      // <CheckboxWithLabel labelOn="On" labelOff="Off" />
    // );

    // // Verify that it's Off by default
    // var label = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'label');
    // expect(label.getDOMNode().textContent).toEqual('Off');

    // // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  // });
});
