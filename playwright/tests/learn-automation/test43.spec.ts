import { test, expect } from '@playwright/test';

test('testing multiple tabs', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://freelance-learn-automation.vercel.app/login")

    const[newPage] = await Promise.all
    (
        [
            context.waitForEvent("page"),
            page.locator("(//a[contains(@href,'facebook')])[1]").click()
        ]
    )
    // await newPage.waitForTimeout(5000)
    await newPage.locator("(//input[@name='email'])[2]").fill("jam@gmail.com")
    // await newPage.waitForTimeout(5000)
    await newPage.close()
    await page.getByPlaceholder("Enter Email").fill("admin@email.com")
    await page.getByPlaceholder("Enter Password").fill("admin@123")
});