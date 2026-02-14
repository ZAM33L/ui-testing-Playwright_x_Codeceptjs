const { test, expect } = require('@playwright/test')

test.describe('DemoQA radio-button tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/radio-button');
    });

    test('succesful page load', async ({ page }) => {
        await expect(page).toHaveURL(/radio-button/)
        await expect(page.locator("//h1[normalize-space()='Radio Button']")).toHaveText('Radio Button')
    })

    test('yes radio button', async ({ page }) => {
        await page.locator("//div[@class='col-12 mt-4 col-md-6']//div//div[2]").click()
        await expect(page.locator("//span[@class='text-success']")).toHaveText('Yes')
    })
    test('impressive radio button', async ({ page }) => {
        await page.locator("//div[@class='col-12 mt-4 col-md-6']//div//div[3]").click()
        await expect(page.locator("//span[@class='text-success']")).toHaveText('Impressive')
    })
    test.only('check if no button is disabled', async ({ page }) => {
        const noRadioInput = page.locator("//input[@id='noRadio']")
        await expect(noRadioInput).toBeDisabled()
    })

})
