Feature("TodoMVC Basic Test");

Scenario("Add, complete & delete a todo", async ({ I }) => {

  // Go to app
  I.amOnPage('https://todomvc.com/examples/react/dist/');

  // Add a new todo
  I.fillField(".new-todo", "Buy milk");
  I.pressKey("Enter");

  // Verify it's added
  I.see("Buy milk", ".todo-list li");

  // Mark as completed
  I.click(".todo-list li .toggle");

  // Assert completed state
  I.seeElement(".todo-list li.completed");

  // Delete the todo
  I.moveCursorTo(".todo-list li");
  I.click(".todo-list li .destroy");

});

