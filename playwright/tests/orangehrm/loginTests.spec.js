const { test, expect } = require('@playwright/test')

test.describe('orangehrm beginner level tests', () => {
    const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

    test('load login page', async ({ page }) => {
        await page.goto(baseURL)
        await expect(page).toHaveURL(baseURL)
        await expect(page.locator('input[name="username"]')).toBeVisible()
    })
    test('valid login', async ({ page }) => {
        await page.goto(baseURL)
        await page.locator('input[name="username"]').fill('Admin')
        await page.locator('input[name="password"]').fill('admin123')
        await page.click('button[type="submit"]')
        await expect(page).toHaveURL(/dashboard/)
        await expect(page.locator("//h6[normalize-space()='Dashboard']")).toBeVisible()
    })
    test('invalid login', async ({ page }) => {
        await page.goto(baseURL)
        await page.locator('input[name="username"]').fill('Admin')
        await page.locator('input[name="password"]').fill('admin1234')
        await page.click('button[type="submit"]')
        await expect(page.locator('text=Invalid credentials')).toBeVisible();
        // await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")).toBeVisible()
    })
    test('empty login', async ({ page }) => {
        await page.goto(baseURL)
        await page.click('button[type="submit"]')
        await expect(page.locator("//div[@class='orangehrm-login-slot-wrapper']//div[1]//div[1]//span[1]")).toBeVisible();
    })
    test('UI Elements Presence', async ({ page }) => {
        await page.goto(baseURL);
        await expect(page.locator('input[name="username"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });
})