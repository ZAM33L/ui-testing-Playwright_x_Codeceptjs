const signupData = require('../data/signupData');
import { expect } from '@playwright/test';

export class SigninPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://parabank.parasoft.com/parabank/index.htm';
        this.resultantUrl = 'https://parabank.parasoft.com/parabank/overview.htm'

        this.username = page.locator("(//form//input)[1]");
        this.password = page.locator("(//form//input)[2]");
        this.loginBtn = page.locator("(//form//input)[3]");
    }

    async openSite() {
        await this.page.goto(this.url);
    }

    async loginToPage() {
        await this.username.fill(signupData.uname);
        await this.password.fill(signupData.pword);
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
        await expect(this.page).toHaveURL(this.resultantUrl)
    }

}
