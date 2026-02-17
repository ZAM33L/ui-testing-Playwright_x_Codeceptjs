const assert = require('assert');

Feature("OrangeHRM Logins Test");

Scenario("Valid Login Test", async ({ I }) => {
    I.amOnPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    I.fillField("//input[@placeholder='Username']", "Admin");
    I.fillField("//input[@placeholder='Password']", "admin123");
    I.click("//button[@type='submit']");
    I.waitForURL('**/dashboard/index', 10)
    I.seeInCurrentUrl('/dashboard/index')
});

Scenario("Invalid Login Test", async ({ I }) => {
    I.amOnPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    I.fillField("//input[@placeholder='Username']", "Admin");
    I.fillField("//input[@placeholder='Password']", "admin1234");
    I.click("//button[@type='submit']");
    I.wait(10)
    I.waitForElement("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']", 12)
    const errMsg = await I.grabTextFrom("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")
    assert.ok(errMsg.includes('Invalid'), "Error message should include 'Invalid'")
    assert.equal(errMsg.trim(), "Invalid credentials", "Error message should exactly match 'Invalid credentials'")
});

Scenario("Empty Login Test", async ({ I }) => {
  I.amOnPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  I.click("//button[@type='submit']");
  I.waitForElement("//span[contains(@class,'input-field-error')]",7)
  const errMsgs = await I.grabTextFromAll("//span[contains(@class,'input-field-error')]")
  assert.equal(errMsgs.length,2)
  assert.equal(errMsgs[0].trim(),"Required")
  assert.equal(errMsgs[1].trim(),"Required")
});