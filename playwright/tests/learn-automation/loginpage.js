export class LoginPage {
    constructor(page) {
        this.page = page;
        this.username= page.getByPlaceholder("Enter Email");
        this.password= page.getByPlaceholder("Enter Password");
        this.login_button = page.getByRole("button",{name:"Sign in"});
    }

    async gotoLink() {
        await this.page.goto('https://freelance-learn-automation.vercel.app/login');
    }

    async loginToApp(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login_button.click();
    }
}

