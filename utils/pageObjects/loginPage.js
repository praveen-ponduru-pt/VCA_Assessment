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
        this.loader = page.locator('div').nth(2);
        // this.loader = page.frameLocator('.snapshot-visible').locator('div#app>div>div.loader');
    }

    async login(userName, password) {

        // await this.loader.waitFor({ state: 'hidden' });
        await this.emailAddress.fill(userName);
        await this.password.fill(password);
        await this.rememberMeCheckbox.click();
        await this.loginButton.click();
    }

    async waitUntilLoginPageIsLoaded() {

        await library.waitForLocatorVisiblity(this.header);
    }
}

export { LoginPage };
