import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/')
  await page.pause()
  await page.locator('[data-test="username"]').click()
  await page.locator('[data-test="username"]').fill('problem_user')
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
//   await page.locator('#login-button').click();
//   await page.getByRole('button', { name: 'LOGIN' }).click();
//   await page.locator('input:has-text("LOGIN")').click()
  await page.locator('xpath=//input[@name="login-button"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click()
  await page.getByRole('link', { name: 'Logout' }).click()
});