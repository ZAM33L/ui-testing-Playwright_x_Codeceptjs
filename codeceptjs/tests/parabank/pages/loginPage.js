const { I } = inject();
const signupData = require('../data/signupData');
const assert = require('assert');

class login2Page {
  url = 'https://parabank.parasoft.com/parabank/index.htm';
  resultantURL = 'https://parabank.parasoft.com/parabank/overview.htm';

  userName = `(//form//input)[1]`;
  passWord = `(//form//input)[2]`;
  loginBtn = `(//form//input)[3]`;

  async open() {
    await I.amOnPage(this.url);
  }

  async loginToThePage() {
    await I.fillField(this.userName, signupData.uname);
    await I.fillField(this.passWord, signupData.pword);
  }

  async clickLogin() {
    await I.click(this.loginBtn);
    await I.waitForURL(this.resultantURL);
  }

  async loginResult() {
  const currentUrl = await I.grabCurrentUrl();
  assert.strictEqual(currentUrl, this.resultantURL);
}
}

module.exports = new login2Page();

