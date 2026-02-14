import { test, expect } from '@playwright/test';
const { LoginPage } = require('../pages/login');

test('Swag Labs login test', async ({ page }) => {
    const Login = new LoginPage(page);
    await Login.gotoLink();
    await Login.loginMethod('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});
