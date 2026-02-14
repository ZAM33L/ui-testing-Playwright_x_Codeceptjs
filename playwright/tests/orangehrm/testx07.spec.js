const { test, expect } = require('@playwright/test');

test.describe('dashboard intermediate test', () => {
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

    test('widget test', async ({ page }) => {
        const quickLaunchWidget = page.locator("//p[normalize-space()='Quick Launch']")
        await expect(quickLaunchWidget).toBeVisible()
        const assignleaveLink = page.locator("//button[@title='Assign Leave']")
        await expect(assignleaveLink).toBeVisible()
    })

    test('navigate thru menu', async ({ page }) => {
        const adminOption = page.locator("//a[normalize-space()='Admin']");
        await expect(adminOption).toBeVisible()
        await adminOption.click()
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers')
    })

    test('widget heading check', async ({ page }) => {
        const heading1 = page.locator("//body/div[@id='app']/div[@class='oxd-layout orangehrm-upgrade-layout']/div[@class='oxd-layout-container']/div[@class='oxd-layout-context']/div[@class='oxd-grid-3 orangehrm-dashboard-grid']/div[6]/div[1]/div[1]")
        await expect(heading1).toBeVisible()
    })

    test('dropdown menu test', async ({ page }) => {
        const ddMenu = page.locator("//div[@class='oxd-topbar-header-userarea']//ul")
        ddMenu.click()
        const supportOption = page.locator("//a[normalize-space()='Support']")
        await expect(supportOption).toBeVisible()
    })

    test.only('Responsive layout adapts at mobile viewport size', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.reload();

        // Check key elements are visible and not overlapping (basic check)
        await expect(page.locator("//h6[normalize-space()='Dashboard']")).toBeVisible()
        await expect(page.locator("//i[@class='oxd-icon bi-list oxd-topbar-header-hamburger']")).toBeVisible();
    });
})