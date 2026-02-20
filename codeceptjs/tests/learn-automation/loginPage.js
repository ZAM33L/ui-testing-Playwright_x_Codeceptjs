const { I } = inject();
const assert = require('assert');

class loginPage {
    url = 'https://freelance-learn-automation.vercel.app/login';

    eMail = `(//form//input)[1]`;
    passWord = `(//form//input)[2]`;
    loginBtn = `//button[@type="submit"]`;

    async open() {
        await I.amOnPage(this.url);
    }

    async fillLoginPage(eMail,passWord) {
        await I.fillField(this.eMail,eMail);
        await I.fillField(this.passWord,passWord);
    }

    async clickLogin() {
        await I.click(this.loginBtn);
    }
}

module.exports = new loginPage();

