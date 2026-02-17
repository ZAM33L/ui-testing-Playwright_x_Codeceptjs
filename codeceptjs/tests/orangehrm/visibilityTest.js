Feature("OrangeHRM Visibility Test");

const bURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const dURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

Before(async ({ I }) => {
    I.amOnPage(bURL);
    I.fillField("//input[@placeholder='Username']", "Admin");
    I.fillField("//input[@placeholder='Password']", "admin123");
    I.click("//button[@type='submit']");
    I.waitForURL(dURL, 10)
    I.seeInCurrentUrl('/dashboard/index')
    I.wait(10);
})
Scenario("QuickLaunch Widget", async ({ I }) => {
    const quickLaunchWidget = "//p[normalize-space()='Quick Launch']"
    I.waitForElement(quickLaunchWidget, 10)
    I.seeElement(quickLaunchWidget)
});

Scenario("Profile Button", async ({ I }) => {
    const avatar = "//img[@alt='profile picture']"
    I.waitForElement(avatar, 10)
    I.seeElement(avatar)
});

Scenario("Logout Button", async ({ I }) => {
    const avatar = "//img[@alt='profile picture']"
    I.waitForElement(avatar, 10)
    I.seeElement(avatar)
    I.click(avatar)
    const logoutBtn = "//a[normalize-space()='Logout']"
    I.waitForElement(logoutBtn, 10)
    I.seeElement(logoutBtn)
    I.click(logoutBtn)
    I.waitForURL('**/auth/login',10)
    I.seeInCurrentUrl('/auth/login')
});