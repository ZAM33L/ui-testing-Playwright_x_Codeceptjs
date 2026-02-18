import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demo.applitools.com/')
    await page.locator('[placeholder="Enter your username"]').fill('tommy')
    await page.locator('[placeholder="Enter your password"]').fill('gta3')
    await page.locator('text=Sign in').click()
    await page.close();
});
