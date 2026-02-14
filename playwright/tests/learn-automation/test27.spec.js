import { test, expect } from '@playwright/test';

test('testing State dropdown', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/signup');

    // await page.locator("#state").selectOption({label:"Goa"})
    // await page.locator("#state").selectOption({index:4})
    // await page.waitForTimeout(5000)
    // const value = await page.locator("#state").textContent()
    // console.log("all dropdown values : "+value)
    // await expect(value.includes("Kerala")).toBeTruthy()


    const select = page.locator('select[name="state"]');
    await expect(select).toBeVisible();

    const options = select.locator('option');

    const count = await options.count();
    console.log('Total options:', count);

    let ddStatus = false

    for (let i = 0; i < count; i++) {
        const txt = await options.nth(i).textContent();
        console.log(`value ${i} is ${txt?.trim()}`);

        if (txt?.toLowerCase() === 'rajasthan') {
            console.log('Found → stopping loop');
            ddStatus = true
            break;
        }
    }
    await expect(ddStatus).toBeTruthy()
    // await expect(ddStatus).toBeFalsy()
});




