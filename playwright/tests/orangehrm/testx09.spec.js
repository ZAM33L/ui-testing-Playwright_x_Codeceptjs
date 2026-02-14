const { test, expect } = require('@playwright/test');

test.describe('dropdown test', () => {
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

    test('dropdown menu test', async ({ page }) => {
        const ddMenu = page.locator("//div[@class='oxd-topbar-header-userarea']//ul")
        ddMenu.click()
        const supportOption = page.locator("//a[normalize-space()='Support']")
        await expect(supportOption).toBeVisible()
    })
    
    test('Click About opens About modal', async ({ page }) => {
        const ddMenu = page.locator("//div[@class='oxd-topbar-header-userarea']//ul")
        ddMenu.click()
        const aboutOption = page.locator("//a[normalize-space()='About']");
        await expect(aboutOption).toBeVisible();
        await aboutOption.click()

        const aboutDialog = page.locator("//div[@class='oxd-dialog-container-default--inner']");
        await expect(aboutDialog).toBeVisible();

        const closeBtn = page.locator("//button[normalize-space()='×']")
        await closeBtn.click()

        await expect(aboutDialog).toBeHidden();
    });

    test.only('Click Support opens Support page', async ({ page }) => {
        const ddMenu = page.locator("//div[@class='oxd-topbar-header-userarea']//ul")
        ddMenu.click()

        const supportOption = page.locator("//a[normalize-space()='Support']")
        await expect(supportOption).toBeVisible()
        await supportOption.click()

        await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/help/support")
    });
})