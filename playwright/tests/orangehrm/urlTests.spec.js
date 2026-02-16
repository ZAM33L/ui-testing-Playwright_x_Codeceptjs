const { test, expect } = require('@playwright/test')

test.describe('social media links test', () => {
    const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'

    const smLinks = [
        { name: 'LinkedIn', selector: 'a[href="https://www.linkedin.com/company/orangehrm/mycompany/"]', expectedUrl: 'https://www.linkedin.com/company/orangehrm/mycompany/' },
        { name: 'Facebook', selector: 'a[href="https://www.facebook.com/OrangeHRM/"]', expectedUrl: 'https://www.facebook.com/OrangeHRM/' },
        // { name: 'Twitter', selector: 'a[href="https://twitter.com/orangehrm?lang=en"]', expectedUrl: 'https://twitter.com/orangehrm?lang=en' },
        { name: 'YouTube', selector: 'a[href="https://www.youtube.com/c/OrangeHRMInc"]', expectedUrl: 'https://www.youtube.com/c/OrangeHRMInc' },
    ]

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL)
    })

    test('logo visibility', async ({ page }) => {
        for (const link of smLinks) {
            await expect(page.locator(link.selector)).toBeVisible()
        }
    })

    test('correct URLs', async ({ page }) => {
        for (const link of smLinks) {
            const href = await page.locator(link.selector).getAttribute('href')
            expect(href).toBe(link.expectedUrl)
        }
    })

    test('clicking links', async ({ page, context }) => {
        for (const link of smLinks) {
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),  
                page.click(link.selector),
            ])
            await newPage.waitForLoadState('domcontentloaded')

            
            expect(newPage.url()).toContain(new URL(link.expectedUrl).hostname)

            await expect(newPage).toHaveTitle(/OrangeHRM|LinkedIn|Facebook|Twitter|YouTube/i)

            await newPage.close()
        }
    })
})
