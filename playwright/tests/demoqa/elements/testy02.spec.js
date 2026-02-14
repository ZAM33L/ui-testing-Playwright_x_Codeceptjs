const { test, expect } = require('@playwright/test')

test.describe('DemoQA check box tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/checkbox');
    });

    test('succesful page load', async ({ page }) => {
        await expect(page).toHaveURL(/checkbox/)
        await expect(page.locator("//h1[normalize-space()='Check Box']")).toHaveText('Check Box')
    })

    test('expand all nodes', async ({ page }) => {
        await page.locator("//button[@title='Expand all']").click()
        await expect(page.locator("//li[contains(@class,'rct-node-expanded')]//span[text()='Home']")).toBeVisible()

        await expect(page.locator("//span[text()='Desktop']")).toBeVisible()
        await expect(page.locator("//span[text()='Documents']")).toBeVisible()
        await expect(page.locator("//span[text()='Downloads']")).toBeVisible()
    })

    test('select home and child checkboxes', async ({ page }) => {
        await page.locator("//button[@title='Expand all']").click()
        await expect(page.locator("//li[contains(@class,'rct-node-expanded')]//span[text()='Home']")).toBeVisible()

        await page.check("//label[@for='tree-node-home']")
        await expect(page.locator("//div[@id='result']")).toContainText('home')
        await expect(page.locator("//div[@id='result']")).toContainText('documents')

        // await page.check("//label[@for='tree-node-documents']");
        // 🔄 this toggles "Documents" → unchecks it roughly so exception becomes false here . so
        await page.uncheck("//label[@for='tree-node-documents']")
        await expect(page.locator("//div[@id='result']")).not.toContainText('documents')
    })

    test('deselect home option', async ({ page }) => {
        await page.locator("//button[@title='Expand all']").click()
        await expect(page.locator("//li[contains(@class,'rct-node-expanded')]//span[text()='Home']")).toBeVisible();

        await page.uncheck("//label[@for='tree-node-home']")
        await expect(page.locator("//div[@id='result']")).toBeHidden()
    })

    test('collapse all nodes', async ({ page }) => {
        
        await page.locator("//button[@title='Expand all']").click()
        await expect(page.locator("//span[text()='Desktop']")).toBeVisible()
        await expect(page.locator("//span[text()='Documents']")).toBeVisible()
        await expect(page.locator("//span[text()='Downloads']")).toBeVisible()

        
        await page.locator("//button[@title='Collapse all']").click()

        await expect(page.locator("//span[text()='Home']")).toBeVisible()

        await expect(page.locator("//span[text()='Desktop']")).toBeHidden()
        await expect(page.locator("//span[text()='Documents']")).toBeHidden()
        await expect(page.locator("//span[text()='Downloads']")).toBeHidden()
    })
})
