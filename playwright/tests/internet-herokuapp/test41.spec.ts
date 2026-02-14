import { test, expect } from '@playwright/test';

test('testing alerts 1', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    page.on('dialog',async(d)=>{
        expect(d.type()).toContain("alert")
        await d.accept()
    })
    await page.locator("//button[text()='Click for JS Alert']").click()
    
});

test('testing alerts 2', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    page.on('dialog',async(d)=>{
        expect(d.type()).toContain("confirm")
        await d.accept()
        // await d.dismiss()
    })
    await page.locator("//button[text()='Click for JS Confirm']").click()
    
});

test('testing alerts 3', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    page.on('dialog',async(d)=>{
        expect(d.type()).toContain("prompt")
        expect(d.message()).toContain("I am a JS prompt")
        await d.accept("Jameel")
        // await d.dismiss()
    })
    await page.locator("//button[text()='Click for JS Prompt']").click()
    // await page.waitForTimeout(5000)
});