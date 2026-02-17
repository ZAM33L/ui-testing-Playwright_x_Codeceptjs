Feature("OrangeHRM Basic Test");

Scenario("Login Test", async ({ I }) => {

  // Go to app
  I.amOnPage('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  I.fillField("//input[@placeholder='Username']", "Admin");
  I.fillField("//input[@placeholder='Password']", "admin123");
  I.click("//button[@type='submit']");
  I.waitForURL('**/dashboard/index',10)
  I.seeInCurrentUrl('/dashboard/index')
  I.wait(10);
  I.click("//img[@alt='profile picture']")
  I.click("//a[text()='Logout']")
  I.waitForURL('**/auth/login',10)
  I.seeInCurrentUrl('/auth/login')
});