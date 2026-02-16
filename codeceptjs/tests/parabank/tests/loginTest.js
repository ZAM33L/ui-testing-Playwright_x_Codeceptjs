const login2Page = require('../pages/loginPage');
const signupData = require('../data/signupData');

Feature('Parabank');

Before(async () => {
  await login2Page.open();
});

Scenario('proper login of page', async () => {
  await login2Page.loginToThePage();
  await login2Page.clickLogin();
  await login2Page.loginResult();  
});
