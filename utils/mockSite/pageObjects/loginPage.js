import { library } from "../library/library";

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailAddress = page.getByPlaceholder('Your Email');
        this.password = page.getByPlaceholder('Your Password');
        this.rememberMeCheckbox = page.getByLabel('Remember me');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.header = page.locator('div.container>div>h3');
        this.subtitle = page.locator('div.container>div>p.subtitle');
        this.invalidMessage = page.locator('li.validation-message');
        this.errorMessageBox = page.locator('div.notification>ul>li');
    }

    /**
     * Login to the application with username and password
     * @param {userName} userName 
     * @param {password} password 
     */
    async login(userName, password) {
        await this.emailAddress.fill(userName);
        await this.password.fill(password);
        await this.rememberMeCheckbox.click();
        await this.loginButton.click();
    }

    /**
     * Waiting until Login header is visible
     */
    async waitUntilLoginPageIsLoaded() {
        await library.waitForLocatorVisiblity(this.header);
    }
}

export { LoginPage };