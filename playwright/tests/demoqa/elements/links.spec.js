const { test, expect } = require('@playwright/test')

test.describe('DemoQA Links Tests', () => {

    let simpleLink, dynamicLink, createdLink, noContentLink, movedLink,
        badRequestLink, unauthorizedLink, forbiddenLink, invalidUrlLink;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/links')

        simpleLink = page.locator("//a[@id='simpleLink']")
        dynamicLink = page.locator("//a[@id='dynamicLink']")
        createdLink = page.locator("//a[@id='created']")
        noContentLink = page.locator("//a[@id='no-content']")
        movedLink = page.locator("//a[@id='moved']")
        badRequestLink = page.locator("//a[@id='bad-request']")
        unauthorizedLink = page.locator("//a[@id='unauthorized']")
        forbiddenLink = page.locator("//a[@id='forbidden']")
        invalidUrlLink = page.locator("//a[@id='invalid-url']")
    })

    test('successful page load', async ({ page }) => {
        await expect(page).toHaveURL(/links/)
        await expect(page.locator("//h1[normalize-space()='Links']")).toHaveText('Links')
    })

    test.describe('Following links will open new tab', () => {

        test('click simple link', async ({ context }) => {
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                simpleLink.click()
            ])
            await newPage.waitForLoadState()
            await expect(newPage).toHaveURL("https://demoqa.com/")
        })

        test('click dynamic link', async ({ context }) => {
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                dynamicLink.click()
            ])
            await newPage.waitForLoadState()
            await expect(newPage).toHaveURL("https://demoqa.com/")
        })
    })
    test.describe('Following links will send an API call', () => {
        
        test('click created link', async ({ page }) => {
            await createdLink.click()
            await expect(page.locator("//p[@id='linkResponse']"))
                .toContainText("Link has responded with staus 201 and status text Created")
        })

        test('click no-content link', async ({ page }) => {
            await noContentLink.click()
            await expect(page.locator("//p[@id='linkResponse']"))
                .toContainText("Link has responded with staus 204 and status text No Content")
        })

        test('click moved link', async ({ page }) => {
            await movedLink.click()
            await expect(page.locator("//p[@id='linkResponse']"))
                .toContainText("Link has responded with staus 301 and status text Moved Permanently")
        })

        test('click bad-request link', async ({ page }) => {
            await badRequestLink.click()
            await expect(page.locator("//p[@id='linkResponse']"))
                .toContainText("Link has responded with staus 400 and status text Bad Request")
        })

        test('click unauthorized link', async ({ page }) => {
            await unauthorizedLink.click()
            await expect(page.locator("//p[@id='linkResponse']"))
                .toContainText("Link has responded with staus 401 and status text Unauthorized")
        })

        test('click forbidden link', async ({ page }) => {
            await forbiddenLink.click()
            await expect(page.locator("//p[@id='linkResponse']"))
                .toContainText("Link has responded with staus 403 and status text Forbidden")
        })

        test('click invalid-url link', async ({ page }) => {
            await invalidUrlLink.click()
            await expect(page.locator("//p[@id='linkResponse']"))
                .toContainText("Link has responded with staus 404 and status text Not Found")
        })

    })


})