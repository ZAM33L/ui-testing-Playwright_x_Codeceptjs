const { test, expect } = require('@playwright/test')

test.describe('orangehrm intermediate level tests', () => {
    const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

    test('password field masking', async ({ page }) => {
        await page.goto(baseURL)
        const pI = page.locator('input[name="password"]')
        await expect(pI).toHaveAttribute('type', 'password')
    })

    test('multiple failed login attempts', async ({ page }) => {
        await page.goto(baseURL)
        const username = 'Admin'
        const wrongPW = 'xcv'

        for (let i = 0; i < 5; i++) {
            await page.goto(baseURL)
            await page.locator('input[name="username"]').fill(username)
            await page.locator('input[name="password"]').fill(wrongPW)
            await page.click('button[type="submit"]')
            await expect(page.locator('text=Invalid credentials')).toBeVisible();
        }
    })

    test('valid logout flow', async ({ page }) => {
        await page.goto(baseURL)
        await page.locator('input[name="username"]').fill('Admin')
        await page.locator('input[name="password"]').fill('admin123')
        await page.click('button[type="submit"]')
        await expect(page).toHaveURL(/dashboard/)
        await page.getByAltText("profile picture").first().click()
        await page.getByText("Logout").click()
        await expect(page).toHaveURL(baseURL)
    })
    test('input field constraints', async ({ page }) => {
        await page.goto(baseURL)
        await page.locator('input[name="username"]').fill('a'.repeat(256))
        await expect(page.locator('input[name="username"]')).toHaveValue('a'.repeat(256))
        await page.locator('input[name="password"]').fill("('!@#$%^&*()_+{}\"'`[")
        await expect(page.locator('input[name="password"]')).toHaveValue("('!@#$%^&*()_+{}\"'`[")
    })
    test('redirect to login when accessing protected page',async({page})=>{
        const dURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
        await page.goto(dURL)
        await expect(page).toHaveURL(baseURL)
    })
})