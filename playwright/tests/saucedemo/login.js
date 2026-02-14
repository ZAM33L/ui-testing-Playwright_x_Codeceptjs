export class LoginPage {
    constructor(page) {
        this.page = page;
        this.username_textbox = page.locator('[data-test="username"]');
        this.password_textbox = page.locator('[data-test="password"]');
        this.login_button = page.getByRole('button', { name: 'LOGIN' });
    }

    async gotoLink() {
        await this.page.goto('https://www.saucedemo.com/v1/');
    }

    async loginMethod(username, password) {
        await this.username_textbox.fill(username);
        await this.password_textbox.fill(password);
        await this.login_button.click();
    }
}
