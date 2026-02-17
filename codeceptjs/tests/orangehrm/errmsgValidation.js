const assert = require('assert');

Feature("OrangeHRM Basic Test");

Scenario("Login Test Error", async ({ I }) => {

  // Go to app
  I.amOnPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  I.fillField("//input[@placeholder='Username']", "Admin");
  I.fillField("//input[@placeholder='Password']", "admin1234");
  I.click("//button[@type='submit']");
  I.wait(10)
  I.waitForElement("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']",12)
  const errMsg = await I.grabTextFrom("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")
  assert.ok(errMsg.includes('Invalid'),"Error message should include 'Invalid'")
  assert.equal(errMsg.trim(),"Invalid credentials","Error message should exactly match 'Invalid credentials'")
});