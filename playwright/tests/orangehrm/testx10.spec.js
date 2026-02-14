const { test, expect } = require('@playwright/test');

test.describe('logout option test', () => {
    const bURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const dURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'

    test.beforeEach(async ({ page }) => {
        await page.goto(bURL)
        await page.locator('input[name="username"]').fill('Admin')
        await page.locator('input[name="password"]').fill('admin123')
        await page.click('button[type="submit"]')
        await expect(page).toHaveURL(dURL)
        await expect(page.locator("//h6[normalize-space()='Dashboard']")).toBeVisible()
    })

    test('logout flow',async({page})=>{
        const ddMenu = page.locator("//div[@class='oxd-topbar-header-userarea']//ul")
        ddMenu.click()
        const logoutOption = page.locator("//a[normalize-space()='Logout']");
        await expect(logoutOption).toBeVisible();
        await logoutOption.click()
        await expect(page).toHaveURL(bURL)
    })
})