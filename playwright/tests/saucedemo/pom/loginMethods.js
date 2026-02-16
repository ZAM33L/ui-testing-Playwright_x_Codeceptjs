const loginData = require('../pom/loginData');

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.username_textbox = page.locator('[data-test="username"]');
        this.password_textbox = page.locator('[data-test="password"]');
        this.login_button = page.getByRole('button', { name: 'LOGIN' });
        this.expectedText = "Username and password do not match any user in this service"
    }

    async gotoLink() {
        await this.page.goto('https://www.saucedemo.com/v1/');
    }

    async loginMethod(username, password) {
        await this.username_textbox.fill(username);
        await this.password_textbox.fill(password);
        await this.login_button.click();
    }

    async m11() {  // Correct username & Correct password
        await this.loginMethod(loginData.crctU, loginData.crctP);
    }

    async m01() {  // Wrong username & Correct password
        await this.loginMethod(loginData.wrngU, loginData.crctP);
    }

    async m10() {  // Correct username & Wrong password
        await this.loginMethod(loginData.crctU, loginData.wrngP);
    }

    async m00() {  // Wrong username & Wrong password
        await this.loginMethod(loginData.wrngU, loginData.wrngP);
    }

    async empty() {  // Empty username & password
        await this.loginMethod('', '');
    }

    async verifyErrorMessage() {
        await this.page.locator('h3[data-test="error"]').waitFor();
        const actualText = await this.page.locator('h3[data-test="error"]').textContent();
        return actualText.includes(this.expectedText);
    }

}
