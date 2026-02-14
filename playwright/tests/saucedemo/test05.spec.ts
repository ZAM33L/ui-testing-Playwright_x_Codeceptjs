import { test, expect } from '@playwright/test';

test.only('test5', async ({ page, context }) => {
    // Start tracing before navigation
    await context.tracing.start({ snapshots: true, screenshots: true });

    try {
        // Go to SauceDemo login page
        await page.goto('https://www.saucedemo.com/v1/');

        // Fill username and password
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');

        // Click login button (corrected name)
        await page.getByRole('button', { name: 'LOGIN123' }).click();

        // Open side menu
        await page.getByRole('button', { name: 'Open Menu' }).click();

        // Click logout
        await page.getByRole('link', { name: 'Logout' }).click();

    }
    finally {
        // Stop tracing and save to file
        await context.tracing.stop({ path: `test_trace_${Date.now()}.zip` });
    }

});
