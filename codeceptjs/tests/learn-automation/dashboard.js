Feature("lelarn automation dashboard test");

const loginPage = require("./loginPage");

Scenario('login to application using pom', async ({ I }) => {

  await loginPage.open();
  await loginPage.fillLoginPage('admin@email.com', 'admin@123');
  await loginPage.clickLogin();

  I.wait(5);

  I.click("//span[text()='Manage']")
  I.click("//a[normalize-space()='Manage Courses']")

});