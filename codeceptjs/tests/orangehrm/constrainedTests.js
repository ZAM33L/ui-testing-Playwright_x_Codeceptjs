const assert = require('assert');

Feature('OrangeHRM Constrained Tests');

const bURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const dURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

Before(({ I }) => {
    I.amOnPage(bURL);
});

Scenario('password field masking', async ({ I }) => {
    const pW = '//input[@name="password"]';
    const pwType = await I.grabAttributeFrom(pW, 'type'); 
    assert.strictEqual(pwType, 'password'); 
});

Scenario('multiple failed login attempts', async ({ I }) => {
    const username = 'Admin';
    const wrongPW = 'xcv';
    const errorMsg = 'Invalid credentials';

    for (let i = 0; i < 5; i++) {
        I.amOnPage(bURL);
        I.fillField('//input[@name="username"]', username);
        I.fillField('//input[@name="password"]', wrongPW);
        I.click('//button[@type="submit"]');
        I.see(errorMsg);
    }
});

Scenario('valid logout flow', async ({ I }) => {
    I.fillField("//input[@placeholder='Username']", "Admin");
    I.fillField("//input[@placeholder='Password']", "admin123");
    I.click("//button[@type='submit']");
    I.waitForURL(dURL, 10)
    I.seeInCurrentUrl('/dashboard/index')
    I.wait(10);
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

Scenario('input field constraints', async ({ I }) => {
    const longUsername = 'a'.repeat(64);
    const specialPassword = "('!@#$%^&*()_+{}\"'`[";
    I.wait(10)
    I.seeElement('//input[@name="username"]')
    I.fillField('//input[@name="username"]', longUsername);
    const usernameValue = await I.grabValueFrom('//input[@name="username"]');
    assert.strictEqual(usernameValue, longUsername);
    I.wait(10)
    I.seeElement('//input[@name="password"]')
    I.fillField('//input[@name="password"]', specialPassword);
    const passwordValue = await I.grabValueFrom('//input[@name="password"]');
    assert.strictEqual(passwordValue, specialPassword);
});

Scenario('redirect to login when accessing protected page', async ({ I }) => {
    I.amOnPage(dURL);
    I.seeInCurrentUrl('/auth/login'); 
});
