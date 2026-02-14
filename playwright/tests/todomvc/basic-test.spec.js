const { test, expect } = require('@playwright/test');

test('Add, complete and delete a todo in TodoMVC React', async ({ page }) => {

  // Go to TodoMVC React app
  await page.goto('https://todomvc.com/examples/react/dist/');

  // Add a new todo
  const newTodo = page.locator('.new-todo');
  await newTodo.fill('Buy milk');
  await newTodo.press('Enter');

  // Verify it's added
  const todoItem = page.locator('.todo-list li');
  await expect(todoItem).toHaveCount(1);
  await expect(todoItem).toHaveText('Buy milk');

  // Mark as completed
  await todoItem.locator('.toggle').click();
  await expect(todoItem).toHaveClass(/completed/);

  // Delete the todo
  await todoItem.hover(); // reveal delete button
  await todoItem.locator('.destroy').click();

  // Verify it's removed
  await expect(todoItem).toHaveCount(0);
});
