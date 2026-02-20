import { test, expect } from '@playwright/test';

test('testing hobbies dropdown', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/signup');
    await page.locator('#hobbies').selectOption(['Playing','Swimming'])
    await page.waitForTimeout(3000)

});