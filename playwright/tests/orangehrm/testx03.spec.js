const { test, expect } = require('@playwright/test')

test.describe('orangehrm advance level tests', () => {
    const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

    test('simultaneous multiple user logins', async ({ browser }) => {
        const c1 = await browser.newContext()
        const c2 = await browser.newContext()

        const p1 = await c1.newPage()
        await p1.goto(baseURL)
        await p1.locator('input[name="username"]').fill('Admin')
        await p1.locator('input[name="password"]').fill('admin123')
        await p1.click('button[type="submit"]')
        await expect(p1).toHaveURL(/dashboard/)

        const p2 = await c2.newPage()
        await p2.goto(baseURL)
        await p2.locator('input[name="username"]').fill('Admin')
        await p2.locator('input[name="password"]').fill('admin123')
        await p2.click('button[type="submit"]')
        await expect(p2).toHaveURL(/dashboard/)

        await c1.close()
        await c2.close()
    })

    test('accessibility - ARIA roles and keyboard navigation', async ({ page }) => {
        await page.goto(baseURL)
        await expect(page.locator("//div[@class='orangehrm-login-slot']")).toBeVisible()
        await expect(page.locator('input[name="username"]')).toBeFocused()
        await page.keyboard.press('Tab')
        await expect(page.locator('input[name="password"]')).toBeFocused()
        await page.keyboard.press('Tab')
        await expect(page.locator('button[type="submit"]')).toBeFocused()
    })

    // test('API login',async({request,page})=>{
    //     const response = await request.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',{
    //         data:{username:'Admin',password:'admin123'}
    //     })
    //     expect(response.ok()).toBeTruthy();
    // })
    test('API login with form data', async ({ request }) => {
        const response = await request.post(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
            {
                form: {
                    username: 'Admin',
                    password: 'admin123'
                }
            }
        );
        expect(response.status()).toBe(200);
    });

})