const { test, expect } = require('@playwright/test');

test.describe('dashboard advanced tests', async () => {
    const bURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const dURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'

    async function login(page, username, password) {
        await page.goto(bURL)
        await page.locator('input[name="username"]').fill('Admin')
        await page.locator('input[name="password"]').fill('admin123')
        await page.click('button[type="submit"]')
        await expect(page).toHaveURL(dURL)
        // await expect(page.locator("//h6[normalize-space()='Dashboard']")).toBeVisible()
    }

    test('simultaneous logins', async ({ browser }) => {
        const c1 = await browser.newContext()
        const p1 = await c1.newPage()
        await login(p1, 'Admin', 'admin123')

        const c2 = await browser.newContext()
        const p2 = await c2.newPage()
        await login(p2, 'Admin', 'admin123')

        await c1.close()
        await c2.close()
    })

    test.only('Unauthorized page access redirects to login', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
        await expect(page).toHaveURL(/auth\/login/);
    });
})