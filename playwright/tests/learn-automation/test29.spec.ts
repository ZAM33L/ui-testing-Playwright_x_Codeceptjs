import { test, expect } from '@playwright/test';

test('testing dashboard', async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login")
    await page.getByPlaceholder("Enter Email").fill("admin@email.com")
    await page.getByPlaceholder("Enter Password").fill("admin@123")
    await page.getByRole("button",{name:"Sign in"}).click()
    await page.locator("//span[text()='Manage']").click()
    await page.locator("//a[normalize-space()='Manage Courses']").click()
});