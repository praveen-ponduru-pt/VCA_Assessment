import { LoginPage } from "../pageObjects/loginPage"
import { expect } from "playwright/test";

const library = {

    async loginToTheApplication(page) {

        const loginPage = new LoginPage(page);

        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        await this.navigateToTheApplication(page);
        await loginPage.waitUntilLoginPageIsLoaded();
        await loginPage.login(username, password);
    },

    async navigateToTheApplication(page) {

        const baseURL = process.env.BASEURL;
        const loginPage = new LoginPage(page);

        await page.goto(baseURL);
        await loginPage.waitUntilLoginPageIsLoaded();
    },

    async waitForLocatorVisiblity(locator) {

        // Wait for the element located by the provided locator to become visible
        await locator.waitFor({ state: 'visible' });
    },

    async verifyPageURL(page, menu) {

        const baseURL = process.env.BASEURL;
        await expect(page).toHaveURL(baseURL + menu);
    },

    async randomInteger(min, max) {

        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    },

}

export { library };
