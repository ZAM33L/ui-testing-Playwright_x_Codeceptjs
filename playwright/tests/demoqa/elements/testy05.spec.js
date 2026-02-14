const { test, expect } = require('@playwright/test')

test.describe('DemoQA buttons tests', () => {

    let doubleClickBtn, rightClickBtn, dynamicClickBtn

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/buttons')

        doubleClickBtn = page.locator("//button[@id='doubleClickBtn']")
        rightClickBtn = page.locator("//button[@id='rightClickBtn']")
        dynamicClickBtn = page.locator("//button[text()='Click Me']")
    })

    test('succesful page load', async ({ page }) => {
        await expect(page).toHaveURL(/buttons/)
        await expect(page.locator("//h1[normalize-space()='Buttons']")).toHaveText('Buttons')
    })

    test('visibility of buttons', async ({ page }) => {
        await expect(doubleClickBtn).toBeVisible()
        await expect(rightClickBtn).toBeVisible()
        await expect(dynamicClickBtn).toBeVisible()
    })

    test('double click button test', async ({ page }) => {
        await doubleClickBtn.dblclick()
        await expect(page.locator("//p[@id='doubleClickMessage']")).toHaveText("You have done a double click")
    })

    test('right click button test', async ({ page }) => {
        await rightClickBtn.click({button:'right'})
        await expect(page.locator("//p[@id='rightClickMessage']")).toHaveText("You have done a right click")
    })

    test('single click button test', async ({ page }) => {
        await dynamicClickBtn.click()
        await expect(page.locator("//p[@id='dynamicClickMessage']")).toHaveText("You have done a dynamic click")
    })

})
