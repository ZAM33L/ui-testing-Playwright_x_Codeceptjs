const { test, expect } = require('@playwright/test')

test.describe('broken links - images', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/broken')
    })

    test('page load', async ({ page }) => {
        await expect(page).toHaveURL(/broken/)
        await expect(page.locator("//h1[normalize-space()='Broken Links - Images']")).toHaveText('Broken Links - Images')
    })

    test('valid image is visible', async ({ page }) => {
        const validImage = page.locator("(//img[@src='/images/Toolsqa.jpg'])[2]")
        await expect(validImage).toBeVisible()
        const naturalWidth = await validImage.evaluate(img => img.naturalWidth)
        expect(naturalWidth).toBeGreaterThan(0)
    })

    test('broken image is not loaded', async ({ page }) => {
        const brokenImage = page.locator("//img[contains(@src,'Toolsqa_1.jpg')]").first()

        await expect(brokenImage).toHaveCount(1)

        const naturalWidth = await brokenImage.evaluate(img => img.naturalWidth)
        expect(naturalWidth).toBe(0)
    })

    test('valid link navigates correctly', async ({ page }) => {
        await page.locator("//a[text()='Click Here for Valid Link']").click()
        await expect(page).toHaveURL("https://demoqa.com/")
    })

    test('broken link returns 500 error', async ({ page, request }) => {
        await page.locator("//a[text()='Click Here for Broken Link']").click()
        const response = await request.get("http://the-internet.herokuapp.com/status_codes/500")
        expect(response.status()).toBe(500)
    })


})

