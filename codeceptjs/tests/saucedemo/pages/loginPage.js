const { I } = inject();
const loginData = require('../data/loginData');
const assert = require('assert')

class LoginPage {
    url = 'https://www.saucedemo.com/v1/'
    username = "//form//input[@placeholder='Username']";
    password = "//form//input[@placeholder='Password']";
    loginBtn = "//form//input[@value='LOGIN']";

    async open() {
        await I.amOnPage(this.url);
    }

    async properLoginResult() {
        //    await I.seeInCurrentUrl('/v1/inventory.html');
        const currentUrl = await I.grabCurrentUrl();
        assert.equal(currentUrl, 'https://www.saucedemo.com/v1/inventory.html');
    }

    async loginToPage(username, password) {
        await I.fillField(this.username, username);
        await I.fillField(this.password, password);
        await I.click(this.loginBtn);
    }

    async m11() {  // Correct username & Correct password
        await this.loginToPage(loginData.crctU, loginData.crctP);
    }

    async m01() {  // Wrong username & Correct password
        await this.loginToPage(loginData.wrngU, loginData.crctP);
    }

    async m10() {  // Correct username & Wrong password
        await this.loginToPage(loginData.crctU, loginData.wrngP);
    }

    async m00() {  // Wrong username & Wrong password
        await this.loginToPage(loginData.wrngU, loginData.wrngP);
    }

    async empty() {  // Empty username & password
        await this.loginToPage('', '');
    }
}

module.exports = new LoginPage();
