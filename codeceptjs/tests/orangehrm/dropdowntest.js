const assert = require('assert');

Feature("OrangeHRM Dropdown Test");

const bURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const dURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

Before(async ({ I }) => {
    I.amOnPage(bURL);
    I.fillField("//input[@name='username']", "Admin");
    I.fillField("//input[@name='password']", "admin123");
    I.click("//button[@type='submit']");
    I.waitForURL(dURL, 10);
    I.seeInCurrentUrl('/dashboard/index');
    I.waitForElement("//h6[normalize-space()='Dashboard']", 10); // Ensure dashboard loaded
});

Scenario("Dropdown menu test", async ({ I }) => {
    const ddMenu = "//div[@class='oxd-topbar-header-userarea']//ul";
    I.waitForElement(ddMenu, 10);
    I.click(ddMenu);

    const supportOption = "//a[normalize-space()='Support']";
    I.waitForElement(supportOption, 10);
    I.seeElement(supportOption);
    I.click(supportOption);

    I.seeInCurrentUrl('/help/support')
});

Scenario("About modal", async ({ I }) => {
    const ddMenu = "//div[@class='oxd-topbar-header-userarea']//ul";
    I.waitForElement(ddMenu, 10);
    I.click(ddMenu);

    const aboutOption ="//a[normalize-space()='About']";
    I.waitForElement(aboutOption, 10);
    I.click(aboutOption);

    const aboutDialog = "//div[@class='oxd-dialog-container-default--inner']";
    I.waitForElement(aboutDialog, 10);
    I.seeElement(aboutDialog);

    const closeBtn = "//button[normalize-space()='×']"
    I.waitForElement(closeBtn, 10);
    I.click(closeBtn);

    I.dontSeeElement(aboutDialog)
});



