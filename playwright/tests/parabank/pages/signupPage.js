const signupData = require('../data/signupData');
import { expect } from '@playwright/test';

export class SignupPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://parabank.parasoft.com/parabank/register.htm';

        this.firstName = page.locator("//form[@action='register.htm']/descendant::input[1]");
        this.lastName = page.locator("//form[@action='register.htm']/descendant::input[2]");
        this.address = page.locator("//form[@action='register.htm']/descendant::input[3]");
        this.city = page.locator("//form[@action='register.htm']/descendant::input[4]");
        this.state = page.locator("//form[@action='register.htm']/descendant::input[5]");
        this.zipCode = page.locator("//form[@action='register.htm']/descendant::input[6]");
        this.phNum = page.locator("//form[@action='register.htm']/descendant::input[7]");
        this.ssn = page.locator("//form[@action='register.htm']/descendant::input[8]");

        this.username = page.locator("//form[@action='register.htm']/descendant::input[9]");
        this.password = page.locator("//form[@action='register.htm']/descendant::input[10]");
        this.confirm = page.locator("//form[@action='register.htm']/descendant::input[11]");

        this.register = page.locator("//form[@action='register.htm']/descendant::input[12]");
    }

    async openSite() {
        await this.page.goto(this.url);
    }

    async signupToPage() {
        await this.firstName.fill(signupData.fname);
        await this.lastName.fill(signupData.lname);
        await this.address.fill(signupData.address);
        await this.city.fill(signupData.city);
        await this.state.fill(signupData.state);
        await this.zipCode.fill(signupData.zipcode);
        await this.phNum.fill(signupData.phNo);
        await this.ssn.fill(signupData.ssn);
        await this.username.fill(signupData.uname);
        await this.password.fill(signupData.pword);
        await this.confirm.fill(signupData.confirm);
    }

    async clickRegister() {
        await this.register.click();
        await expect(this.page).toHaveURL(/.*register\.htm/);
    }

    async properSignUpResult(expectedName) {
        
        await expect(this.page.locator('h1.title'))
            .toHaveText(`Welcome ${expectedName}`);

        await expect(this.page.locator("//div[@id='rightPanel']//p"))
            .toHaveText('Your account was created successfully. You are now logged in.');
    }
}
