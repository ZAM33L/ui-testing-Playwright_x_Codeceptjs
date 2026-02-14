import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demo.applitools.com/')
    await page.pause()
    //   await page.getByRole('textbox', { name: 'Enter your username' }).click();
    //   await page.getByRole('textbox', { name: 'Enter your username' }).fill('tommy');
    //   await page.getByRole('textbox', { name: 'Enter your password' }).click();
    //   await page.getByRole('textbox', { name: 'Enter your password' }).fill('gta3');
    //   await page.getByRole('link', { name: 'Sign in' }).click();
    await page.locator('[placeholder="Enter your username"]').fill('tommy')
    await page.locator('[placeholder="Enter your password"]').fill('gta3')
    await page.locator('text=Sign in').click()
    await page.close();
});
