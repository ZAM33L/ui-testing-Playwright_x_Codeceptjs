const assert = require('assert');
const loginPage = require("./loginPage");

Feature("Context test");

const baseURL = 'https://freelance-learn-automation.vercel.app/login';

const fbLink = "(//a[contains(@href,'facebook')])[1]"
const fbEmailBox = "(//input[@name='email'])[2]"

Before(async ({ I }) => {
    I.amOnPage(baseURL);
});


Scenario('testing multipleTabs', async ({ I }) => {

    I.click(fbLink)

    I.switchToNextTab()

    I.waitForElement(fbEmailBox, 10)
    I.fillField(fbEmailBox, "jam@gmail.com")

    I.closeCurrentTab()

    await loginPage.open();
    await loginPage.fillLoginPage('admin@email.com', 'admin@123');

    I.wait(5);
});





