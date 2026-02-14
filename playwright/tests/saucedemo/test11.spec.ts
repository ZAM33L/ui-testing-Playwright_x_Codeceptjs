import {test,expect} from '@playwright/test'
import { text } from 'stream/consumers';

test.describe('all my tests',()=>{



test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    // await page.close()
})

// test.afterAll(async({page})=>{
//     await page.close();
// })

test('homepage',async ({page})=>{
    // await page.goto('https://www.saucedemo.com/')
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    // await page.locator('[data-test="login-button"]').click();
    // await page.waitForURL('https://www.saucedemo.com/inventory.html');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    // await page.close()
})

test('logout',async({page})=>{
    // await page.goto('https://www.saucedemo.com/')
    // await page.locator('[data-test="username"]').fill('standard_user');
    // await page.locator('[data-test="password"]').fill('secret_sauce');
    // await page.locator('[data-test="login-button"]').click();
    // await page.waitForURL('https://www.saucedemo.com/inventory.html');

    await page.locator('text=Open Menu').click()
    await page.locator('text=Logout').click()
    await page.waitForURL('https://www.saucedemo.com/');
    // await page.close()
})

})