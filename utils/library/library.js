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

    // async waitUntilLoaderIsHidden(page) {

    //     await page.waitForSelector('iframe.snapshot-visible');

    //     // Get the frame element handle
    //     const frameHandle = await page.waitForSelector('iframe.snapshot-visible');

    //     // Wait for the frame to load
    //     const frame = await frameHandle.contentFrame();

    //     // Wait for the element with class 'is-loading' to become hidden inside the frame
    //     await frame.waitForSelector('.is-loading', { state: 'hidden' });
    // },

    async getAClient() {

        
    },

    async verifyPageURL(page) {

        const baseURL = process.env.BASEURL;
        await expect(page).tohaveURL(baseURL + page);
    }
}

export { library };
