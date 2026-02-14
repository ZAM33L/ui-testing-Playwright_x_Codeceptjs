import { test, expect } from '@playwright/test';
const testdata = JSON.parse(JSON.stringify(require("../json files/testdata.json")))

test('testing json importing', async ({ page }) => {

    await page.goto("https://freelance-learn-automation.vercel.app/login")
    await page.getByPlaceholder("Enter Email").fill(testdata.username)
    await page.getByPlaceholder("Enter Password").fill(testdata.password)
    await page.waitForTimeout(5000)

});