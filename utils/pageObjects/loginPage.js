class LoginPage {
    constructor(page) {

        this.page = page;
        this.emailAddress = page.getByPlaceholder('Your Email');
        this.password = page.getByPlaceholder('Your Password');
        this.rememberMeCheckbox = page.getByLabel('Remember me');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.header = page.locator('div.container>div>h3');
        this.subtitle = page.locator('div.container>div>p.subtitle');
    }

    async login(userName, password) {

        await this.emailAddress.fill(userName);
        await this.password.fill(password);
        await this.rememberMeCheckbox.click();
        await this.loginButton.click();
    }
}

export { LoginPage };
