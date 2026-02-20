import { test, expect } from '@playwright/test';

test('testing upload', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload")
    await page.locator("#file-upload").setInputFiles("./images/mrRobot.jpg")
    await page.locator("#file-submit").click()
    await expect(page.locator("//h3")).toHaveText("File Uploaded!")
});