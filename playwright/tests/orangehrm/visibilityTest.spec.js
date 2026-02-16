const { test, expect } = require('@playwright/test');

test.describe('dashboard test',()=>{
    const bURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    const dURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'

    test.beforeEach(async({page})=>{
        await page.goto(bURL)
        await page.locator('input[name="username"]').fill('Admin')
        await page.locator('input[name="password"]').fill('admin123')
        await page.click('button[type="submit"]')
        await expect(page).toHaveURL(dURL)
        await expect(page.locator("//h6[normalize-space()='Dashboard']")).toBeVisible()
    })

    test('visibility test of widget',async({page})=>{
        const quickLaunchWidget = page.locator("//p[normalize-space()='Quick Launch']")
        await expect(quickLaunchWidget).toBeVisible()
    })

    test('visibility test of profile avatar',async({page})=>{
        const avatar = page.locator('img[alt="profile picture"]')
        await expect(avatar).toBeVisible()
    })

    test('logout button',async({page})=>{
        const avatar = page.locator('img[alt="profile picture"]')
        await expect(avatar).toBeVisible()
        await avatar.click()
        const logoutBtn = page.locator("//a[normalize-space()='Logout']")
        await expect(logoutBtn).toBeVisible()
        await logoutBtn.click()
        await expect(page).toHaveURL(bURL)
    })
})