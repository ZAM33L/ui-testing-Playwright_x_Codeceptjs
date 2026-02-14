const { test, expect } = require('@playwright/test')

test.describe('DemoQA text box tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/text-box');
    });

    test('succesful page load', async ({ page }) => {
        await expect(page).toHaveURL(/text-box/)
        await expect(page.locator("//h1[normalize-space()='Text Box']")).toHaveText('Text Box')
    })

    test('fill and submit valid text inputs', async ({ page }) => {
        await page.locator("//input[@id='userName']").fill("Jameel")
        await page.locator("//input[@id='userEmail']").fill("jam@gmail.com")
        await page.locator("//textarea[@id='currentAddress']").fill("Triplicane , Chennai")
        await page.locator("//textarea[@id='permanentAddress']").fill("Royapettah , Chennai")
        await page.locator("//button[@id='submit']").click()

        await expect(page.locator("//p[@id='name']")).toHaveText(/Jameel/)
        await expect(page.locator("//p[@id='email']")).toHaveText(/jam@gmail.com/)
        await expect(page.locator("//p[@id='currentAddress']")).toHaveText(/Triplicane , Chennai/)
        await expect(page.locator("//p[@id='permanentAddress']")).toHaveText(/Royapettah , Chennai/)
    })

    test('form clears on page reload', async ({ page }) => {
        await page.locator("//input[@id='userName']").fill("Jameel")
        await page.reload()
        await expect(page.locator("//input[@id='userName']")).toHaveValue('')
    })

    test.only('Verify invalid email shows error', async ({ page }) => {
        await page.fill('#userEmail', 'invalid-email');
        await page.click('#submit');
        const emailInput = page.locator('#userEmail');
        await expect(emailInput).toHaveClass(/field-error/);
    });
})
