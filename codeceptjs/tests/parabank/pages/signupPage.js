const { I } = inject();
const signupData = require('../data/signupData');
const assert = require('assert');

class signupPage {
    url = 'https://parabank.parasoft.com/parabank/register.htm';

    firstName = `//form[@action='register.htm']/descendant::input[1]`;
    lastName = `//form[@action='register.htm']/descendant::input[2]`;
    address = `//form[@action='register.htm']/descendant::input[3]`;
    city = `//form[@action='register.htm']/descendant::input[4]`;
    state = `//form[@action='register.htm']/descendant::input[5]`;
    zipCode = `//form[@action='register.htm']/descendant::input[6]`;
    phNum = `//form[@action='register.htm']/descendant::input[7]`;
    ssn = `//form[@action='register.htm']/descendant::input[8]`;

    username = `//form[@action='register.htm']/descendant::input[9]`;
    password = `//form[@action='register.htm']/descendant::input[10]`;
    confirm = `//form[@action='register.htm']/descendant::input[11]`;

    register = `//form[@action='register.htm']/descendant::input[12]`;

    async open() {
        await I.amOnPage(this.url);
    }

    async signupToPage() {
        await I.fillField(this.firstName, signupData.fname);
        await I.fillField(this.lastName, signupData.lname);
        await I.fillField(this.address, signupData.address);
        await I.fillField(this.city, signupData.city);
        await I.fillField(this.state, signupData.state);
        await I.fillField(this.zipCode, signupData.zipcode);
        await I.fillField(this.phNum, signupData.phNo);
        await I.fillField(this.ssn, signupData.ssn);
        await I.fillField(this.username, signupData.uname);
        await I.fillField(this.password, signupData.pword);
        await I.fillField(this.confirm, signupData.confirm);
    }

    async clickRegister() {
        await I.click(this.register);
        await I.waitForURL(`https://parabank.parasoft.com/parabank/register.htm`);
    }

    async properSignUpResult(expectedName) {
        await I.see(`Welcome ${expectedName}`, 'h1.title');
        await I.see('Your account was created successfully. You are now logged in.', 'p');
    }

}

module.exports = new signupPage();
