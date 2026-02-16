import { test, expect } from '@playwright/test';
const { LoginPage } = require('./loginMethods');

let login;   // declare variable

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);   
    await login.gotoLink();
});

test('Swag Labs proper login test', async ({ page }) => { 
    await login.m11();
    await expect(page).toHaveURL(/inventory/);
});

test('Swag Labs improper login test 1', async () => {
    await login.m01();
});

test('Swag Labs improper login test 2', async () => {
    await login.m10();
});

test('Swag Labs improper login test 3', async () => {
    await login.m00();
});

test('Swag Labs empty login test', async () => {
    await login.empty();
});
