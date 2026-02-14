import { test, expect } from '@playwright/test';

test.describe("todomvc tests", () => {
    test('tests', async ({ page }) => {
        await page.goto('https://todomvc.com/examples/react/dist/');

        // ----------------------
        // Selectors (Single Source of Truth)
        // ----------------------
        const selectors = {
            listItem: '//li[@data-testid="todo-item"]',
            newTodo: '#todo-input',
            todoItem: '[data-testid="todo-item"]',
            checkBox: 'input[type="checkbox"]',
            deleteBtn: 'button.destroy',
            editInput: '[data-testid="text-input"]',
            todoCount: '.todo-count',
            toggleAll: '#toggle-all',
            filterAll: 'a[href="#/"]',
            filterActive: 'a[href="#/active"]',
            filterCompleted: 'a[href="#/completed"]',
            clearCompleted: 'button.clear-completed'
        };

        const items = [
            'Write a guide',
            'Correct the guide',
            'Publish the guide',
            'Promote the guide'
        ];

        const newTodo = page.locator(selectors.newTodo);
        const todoItems = page.locator(selectors.todoItem);
        const todoCount = page.locator(selectors.todoCount);

        // ----------------------
        // Helper Functions
        // ----------------------

        const getItem = (text) =>
            page.locator(selectors.todoItem, { hasText: text });

        const expectItemsLeft = async (count) =>
            await expect(todoCount).toContainText(`${count} item`);

        const switchFilter = async (filter) =>
            await page.click(filter);

        // ----------------------
        // TEST 1 - Create Items
        // ----------------------
        console.log("test 1 starts");

        for (const item of items) {
            await newTodo.fill(item);
            await newTodo.press('Enter');
        }

        await expect(todoItems).toHaveCount(items.length);
        await expectItemsLeft(items.length);

        console.log("test 1 ends");


        // ----------------------
        // TEST 2 - Complete Item
        // ----------------------
        console.log("test 2 starts");

        const completeItem = getItem(items[1]);
        await completeItem.locator(selectors.checkBox).click();

        await expect(completeItem).toHaveClass(/completed/);
        await expectItemsLeft(3);

        console.log("test 2 ends");


        // ----------------------
        // TEST 3 - Delete Item
        // ----------------------
        console.log("test 3 starts");

        const deleteItem = getItem(items[2]);
        await deleteItem.hover();
        await deleteItem.locator(selectors.deleteBtn).click();

        await expect(deleteItem).toHaveCount(0);
        await expectItemsLeft(2);

        console.log("test 3 ends");

        // ----------------------
        // TEST 4 - Edit an item
        // ----------------------
        console.log("test 4 starts")

        const item = page.locator('[data-testid="todo-item"]', { hasText: 'Promote the guide' });

        await item.hover();
        await item.dblclick();
        const editInput = page.locator("//li[@data-testid='todo-item']//input[@data-testid='text-input']")
        await editInput.click();
        await editInput.fill('updated');
        await editInput.press('Enter');

        await expect(page.locator('[data-testid="todo-item"]', { hasText: 'updated' })).toBeVisible();
        await expect(todoCount).toContainText('2 items left');

        console.log("test 4 ends")

        // ----------------------
        // TEST 5 - Filter Assertions
        // ----------------------
        console.log("test 5 starts");

        await switchFilter(selectors.filterAll);
        await expect(todoItems).toHaveCount(3);

        await switchFilter(selectors.filterActive);
        await expect(todoItems).toHaveCount(2);

        await switchFilter(selectors.filterCompleted);
        await expect(todoItems).toHaveCount(1);

        console.log("test 5 ends");

        // ----------------------
        // TEST 6 - Toggle All
        // ----------------------
        console.log("test 6 starts");

        await switchFilter(selectors.filterAll);

        await page.check(selectors.toggleAll);

        await expect(page.locator("//li[@data-testid='todo-item' and contains(@class,'completed')]")).toHaveCount(3);
        await expect(todoCount).toContainText('0 items left');

        await page.uncheck(selectors.toggleAll);
        await expect(todoCount).toContainText('3 items left');

        console.log("test 6 ends");

        // ----------------------
        // TEST 7 - check a single one
        // ----------------------

        console.log("test 7 starts")
        await completeItem.locator(selectors.checkBox).click();

        await expect(completeItem).toHaveClass(/completed/);
        await expect(todoCount).toContainText('2 items left');

        console.log("test 7 ends")

        // ----------------------
        // TEST 8 - Clear completed
        // ----------------------
        console.log("test 8 starts")
        const listItems = page.locator(selectors.listItem);
        await expect(listItems).toHaveCount(3);

        const clearCompletedBtn = page.locator(selectors.clearCompleted);
        await clearCompletedBtn.click();

        await expect(listItems).toHaveCount(2);
        await expect(todoCount).toContainText('2 items left');

        console.log("test 8 ends")

        // ----------------------
        // TEST 9 - checking all elements and using clear completed
        // ----------------------
        console.log("test 9 starts")
        await page.check(selectors.toggleAll);

        await expect(page.locator("//li[@data-testid='todo-item' and contains(@class,'completed')]")).toHaveCount(2);
        await expect(todoCount).toContainText('0 items left');

        await clearCompletedBtn.click();

        await expect(listItems).toHaveCount(0);
        await expect(page.locator("//span[text()='0 items left!']")).not.toBeVisible();

        console.log("test 9 ends")

        // ----------------------
        // TEST 10 - exploring visibility in acttive tab
        // ----------------------

        console.log("test 10 starts");

        for (const item of items) {
            await newTodo.fill(item);
            await newTodo.press('Enter');
        }

        await expect(todoItems).toHaveCount(items.length);
        await expectItemsLeft(items.length);

        // Switch to Active
        await switchFilter(selectors.filterActive);
        await expect(listItems).toHaveCount(items.length);

        // Toggle all (while in Active)
        await page.getByTestId('toggle-all').click()

        // Active tab should now show 0
        await expect(listItems).toHaveCount(0);
        await expect(page.getByText('0 items left!')).toBeVisible();

        // Switch to Completed
        await switchFilter(selectors.filterCompleted);
        await expect(listItems).toHaveCount(items.length);

        // Clear completed
        await clearCompletedBtn.click();

        // Everything should be gone
        await expect(todoItems).toHaveCount(0);
        await expect(page.getByText('0 items left!')).toHaveCount(0);

        console.log("test 10 ends");

        // ----------------------
        // TEST 11 - exploring visibility in completed tab
        // ----------------------

        console.log("test 11 starts");

        for (const item of items) {
            await newTodo.fill(item);
            await newTodo.press('Enter');
        }

        await expect(todoItems).toHaveCount(0);
        await expect(page.getByText('4 items left!')).toBeVisible();

        // Switch to Active
        await switchFilter(selectors.filterActive);
        await expect(listItems).toHaveCount(items.length);

        // Toggle all (while in Active)
        await page.getByTestId('toggle-all').click()

        // Active tab should now show 0
        await expect(listItems).toHaveCount(0);
        await expect(page.getByText('0 items left!')).toBeVisible();

        // Switch to Completed
        await switchFilter(selectors.filterCompleted);
        await expect(listItems).toHaveCount(items.length);

        // Clear completed
        await clearCompletedBtn.click();

        // Everything should be gone
        await expect(todoItems).toHaveCount(0);
        await expect(page.getByText('0 items left!')).toHaveCount(0);

        console.log("test 11 ends");

        // ----------------------
        // TEST 12 - Untoggle
        // ----------------------
        console.log("test 12 starts");

        // Add 2 items
        await newTodo.fill('Write a guide');
        await newTodo.press('Enter');
        await newTodo.fill('Correct the guide');
        await newTodo.press('Enter');

        await switchFilter(selectors.filterAll);

        // Initially none completed
        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(0);
        await expectItemsLeft(2);

        // Toggle all
        await page.getByTestId('toggle-all').click();

        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(2);
        await expectItemsLeft(0);

        // Go to completed tab
        await switchFilter(selectors.filterCompleted);
        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(2);
        await expectItemsLeft(0);

        // Back to all & untoggle
        await switchFilter(selectors.filterAll);
        await page.getByTestId('toggle-all').click();

        await expect(todoItems).toHaveCount(2);
        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(0);
        await expectItemsLeft(2);

        console.log("test 12 ends");

        // ----------------------
        // TEST 13 untoggle via completed
        // ----------------------
        console.log("test 13 starts");

        // Toggle all again
        await page.getByTestId('toggle-all').click();

        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(2);
        await expectItemsLeft(0);

        await switchFilter(selectors.filterActive);
        await expect(todoItems).toHaveCount(0);
        await expectItemsLeft(0);

        await switchFilter(selectors.filterCompleted);
        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(2);

        // Untoggle
        await page.getByTestId('toggle-all').click();

        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(0);
        await expectItemsLeft(2);

        await switchFilter(selectors.filterAll);
        await expect(todoItems).toHaveCount(2);

        await switchFilter(selectors.filterActive);
        await expect(todoItems).toHaveCount(2);

        console.log("test 13 ends");

        // ----------------------
        // TEST 14 untoggle via all
        // ----------------------
        console.log("test 14 starts");

        await switchFilter(selectors.filterActive);
        await expect(todoItems).toHaveCount(2);
        await expectItemsLeft(2);

        // Toggle all from active
        await page.getByTestId('toggle-all').click();

        await expect(todoItems).toHaveCount(0);
        await expectItemsLeft(0);

        await switchFilter(selectors.filterAll);
        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(2);

        await switchFilter(selectors.filterCompleted);
        await expect(page.locator(`${selectors.todoItem}.completed`)).toHaveCount(2);

        // Untoggle again
        await page.getByTestId('toggle-all').click();

        await switchFilter(selectors.filterAll);
        await expect(todoItems).toHaveCount(2);
        await expectItemsLeft(2);

        console.log("test 14 ends");

        // ----------------------
        // TEST 15 complete and uncomplete an specific item
        // ----------------------
        console.log("test 15 starts");

        const correctItem = getItem('Correct the guide');

        // Complete it
        await correctItem.locator(selectors.checkBox).click();
        await expect(correctItem).toHaveClass(/completed/);

        await switchFilter(selectors.filterActive);
        await expect(correctItem).toHaveCount(0);

        await switchFilter(selectors.filterCompleted);
        await expect(correctItem).toBeVisible();

        // Uncomplete it
        await correctItem.locator(selectors.checkBox).click();
        await expectItemsLeft(2);

        await switchFilter(selectors.filterActive);
        await expect(correctItem).toBeVisible();

        await switchFilter(selectors.filterAll);
        await expect(correctItem).toBeVisible();

        console.log("test 15 ends");

        // ----------------------
        // TEST 16 delete an active item
        // ----------------------
        console.log("test 16 starts");

        await correctItem.hover();
        await correctItem.locator(selectors.deleteBtn).click();

        await expect(correctItem).toHaveCount(0);
        await expectItemsLeft(1);

        await switchFilter(selectors.filterActive);
        await expect(correctItem).toHaveCount(0);

        await switchFilter(selectors.filterCompleted);
        await expect(correctItem).toHaveCount(0);

        console.log("test 16 ends");

        // ----------------------
        // TEST 17 delete an completed item
        // ----------------------
        console.log("test 17 starts");

        await newTodo.fill('Publish the guide');
        await newTodo.press('Enter');

        const publishItem = getItem('Publish the guide');

        await switchFilter(selectors.filterAll)
        await publishItem.locator(selectors.checkBox).click();
        await expect(publishItem).toHaveClass(/completed/);
        await expectItemsLeft(1);

        await switchFilter(selectors.filterCompleted)
        await publishItem.hover();
        await publishItem.locator(selectors.deleteBtn).click();

        await expect(publishItem).toHaveCount(0);

        console.log("test 17 ends");

        // ----------------------
        // TEST 18 -  edit an active item
        // ----------------------
        
        console.log("test 18 starts");

        await switchFilter(selectors.filterAll)

        await newTodo.fill('Publish the guide');
        await newTodo.press('Enter');

        const editItem = getItem('Publish the guide');

        await editItem.dblclick();
        const editField1 = page.locator("//li[@data-testid='todo-item']//input[@data-testid='text-input']")
        await editField1.click();
        await editField1.fill('updated . proofread the guide');
        await editField1.press('Enter');

        await expect(getItem('updated . proofread the guide')).toBeVisible();
        await expectItemsLeft(2);

        await switchFilter(selectors.filterActive);
        await expect(getItem('updated . proofread the guide')).toBeVisible();

        console.log("test 18 ends");

        // ----------------------
        // TEST 19 - edit an completed item
        // ----------------------
        await page.pause()
        console.log("test 19 starts");

        const updatedItem = getItem('updated . proofread the guide');

        await updatedItem.locator(selectors.checkBox).click();
        await switchFilter(selectors.filterCompleted)
        await expect(updatedItem).toHaveClass(/completed/);
        await expectItemsLeft(1);

        await updatedItem.dblclick();
        const editField2 = page.locator("//li[@data-testid='todo-item']//input[@data-testid='text-input']")
        await editField2.click();
        await editField2.fill('again updated . proofread the guide');
        await editField2.press('Enter');

        await expect(getItem('again updated . proofread the guide')).toBeVisible();
        await expectItemsLeft(1);

        console.log("test 19 ends");

    });
})

