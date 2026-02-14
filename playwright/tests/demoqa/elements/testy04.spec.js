const { test, expect } = require('@playwright/test')

test.describe('DemoQA web tables tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/webtables')
    })

    test('succesful page load', async ({ page }) => {
        await expect(page).toHaveURL(/webtables/)
        await expect(page.locator("//h1[normalize-space()='Web Tables']")).toHaveText('Web Tables')
    })

    test('visibility of records', async ({ page }) => {
        await expect(page.locator("//div[normalize-space()='Kierra']")).toBeVisible()
    })

    test('add new record test', async ({ page }) => {
        await page.locator("//button[@id='addNewRecordButton']").click()
        await expect(page.locator("//div[@role='document']")).toBeVisible()

        await page.locator("//input[@id='firstName']").fill("Jameel")
        await page.locator("//input[@id='lastName']").fill("Asfer")
        await page.locator("//input[@id='userEmail']").fill("jam@gmail.com")
        await page.locator("//input[@id='age']").fill("22")
        await page.locator("//input[@id='salary']").fill("10000")
        await page.locator("//input[@id='department']").fill("IT")
        await page.locator("//button[@id='submit']").click()

        // await expect(page.locator("//div[@class='rt-tr-group']//div[text()='Jameel']")).toBeVisible();
        await expect(page.locator("//div[normalize-space()='Jameel']")).toBeVisible()
    })

    test('search record test for Names', async ({ page }) => {
        const expected = 
        ["Kierra", "Gentry", "29", "kierra@example.com", "2000", "Legal", 
        /* "Jameel", "Asfer", "jam@gmail.com", "22", "10000", "IT" */
        ];

        for (const value of expected) {
            await expect(page.locator(`//div[@class='rt-td' and normalize-space()='${value}']`)).toBeVisible();
        }
    })

    test('edit a record by search option', async ({ page }) => {
        const expected = 
        ["Kierra", "Gentry", "29", "kierra@example.com", "2000", "Legal", 
        /* "Jameel", "Asfer", "jam@gmail.com", "22", "10000", "IT" */
        ];
        const searchTerm = "Kierra"; // could also be dynamic
        await page.fill("#searchBox", searchTerm)

        if (expected.includes(searchTerm)) {
            for (const value of expected) {
                await expect(page.locator(`//div[@class='rt-td' and normalize-space()='${value}']`)).toBeVisible()
            }

            await page.locator(`//div[@class='rt-td' and normalize-space()='${searchTerm}']/..//span[@title='Edit']`).click()

            await page.fill("#age", "35")
            await page.fill("#department", "HR")

            await page.locator("#submit").click()

            const updated = ["Kierra", "Gentry", "35", "kierra@example.com", "2000", "HR"]
            for (const value of updated) {
                await expect(page.locator(`//div[@class='rt-td' and normalize-space()='${value}']`)).toBeVisible()
            }
        } else {
            throw new Error(`Search term "${searchTerm}" does not match any expected value`)
        }
    })

    test('edit a record by row index', async ({ page }) => {
        const rowIndex = 1

        await page.locator(`(//span[@title='Edit'])[${rowIndex}]`).click()

        await page.locator("//input[@id='firstName']").fill("Lena")
        await page.locator("//input[@id='lastName']").fill("tamil")
        await page.locator("//input[@id='userEmail']").fill("lena@gmail.com")
        await page.locator("//input[@id='age']").fill("22")
        await page.locator("//input[@id='salary']").fill("10000")
        await page.locator("//input[@id='department']").fill("Finance")
        await page.locator("//button[@id='submit']").click()

        // Step 5: verify updated values in the table
        const updated = ["Lena", "tamil", "Finance"]
        for (const value of updated) {
            await expect(page.locator(`(//div[@class='rt-tr-group'])[${rowIndex}]//div[@class='rt-td' and normalize-space()='${value}']`)).toBeVisible();
        }
    })

    test('delete rows directly by index value', async ({ page }) => {
        const rowIndex = 1
        const rowValuesBefore = await page.locator(`(//div[@class='rt-tr-group'])[${rowIndex}]//div[@class='rt-td']`).allInnerTexts()
        await page.locator(`(//span[@title='Delete'])[${rowIndex}]`).click()
        const allRowsAfter = await page.locator("//div[@class='rt-tr-group']").allInnerTexts()
        expect(allRowsAfter).not.toContain(rowValuesBefore)

    })

    test('delete rows directly by search option', async ({ page }) => {

        const expected = ["Kierra", "Gentry", "29", "kierra@example.com", "2000", "Legal",
            "Jameel", "Asfer", "jam@gmail.com", "22", "10000", "IT"]

        const searchTerm = "Kierra"; 
        await page.fill("#searchBox", searchTerm)

        if(expected.includes(searchTerm)){
            for(const value of expected){
                if(value === searchTerm){
                    await expect(page.locator(`//div[@class='rt-td' and normalize-space()='${value}']`)).toBeVisible()
                }
            }

            await page.locator(`//div[@class='rt-td' and normalize-space()='${searchTerm}']/..//span[@title='Delete']`).click()
            // u can search and check the deletion
            // await page.fill("#searchBox", searchTerm)
            await expect(page.locator(`//div[@class='rt-td' and normalize-space()='${searchTerm}']`)).toHaveCount(0)
        }
    })

})







