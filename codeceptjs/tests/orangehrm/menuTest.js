const assert = require('assert');

Feature("OrangeHRM Visibility Test");

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

Scenario("Navigate thru menu", async ({ I }) => {
  const adminOption = "//a[normalize-space()='Admin']";
  I.waitForElement(adminOption, 10);
  I.seeElement(adminOption);
  I.click(adminOption);
  I.seeInCurrentUrl('/admin/viewSystemUsers');
});

Scenario("Widget test", async ({ I }) => {
  const quickLaunchWidget = "//p[normalize-space()='Quick Launch']";
  I.waitForElement(quickLaunchWidget, 10);
  I.seeElement(quickLaunchWidget);

  const assignLeaveButton = "//button[@title='Assign Leave']";
  I.waitForElement(assignLeaveButton, 10);
  I.seeElement(assignLeaveButton);
});


Scenario("Dropdown menu test", async ({ I }) => {
  const ddMenu = "//div[@class='oxd-topbar-header-userarea']//ul";
  I.waitForElement(ddMenu, 10);
  I.click(ddMenu);

  const supportOption = "//a[normalize-space()='Support']";
  I.waitForElement(supportOption, 10);
  I.seeElement(supportOption);
});

Scenario("Responsive layout adapts at mobile viewport size", async ({ I }) => {

  I.resizeWindow(375, 667);

  I.refreshPage();

  const dashboardHeading = "//h6[normalize-space()='Dashboard']";
  I.waitForElement(dashboardHeading, 10);
  I.seeElement(dashboardHeading);

  const hamburgerIcon = "//i[@class='oxd-icon bi-list oxd-topbar-header-hamburger']";
  I.waitForElement(hamburgerIcon, 10);
  I.seeElement(hamburgerIcon);
});

