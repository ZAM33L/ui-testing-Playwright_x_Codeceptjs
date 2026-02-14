import { test, expect } from '@playwright/test';
import {LoginPage} from "./loginpage";

test('login to application using pom', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.gotoLink()
    await loginPage.loginToApp("admin@email.com","admin@123")
    await page.waitForTimeout(5000)
})
