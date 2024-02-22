import { LoginPage } from "../pageObjects/loginPage"
import { expect } from "playwright/test";
import { Clients } from "../pageObjects/clients/clients";

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

    async verifyPageURL(page, menu) {

        const baseURL = process.env.BASEURL;
        await expect(page).toHaveURL(baseURL + menu);
    },

    async randomInteger(min, max) {

        // now rand is from  (min-0.5) to (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    },

    async getARandomClient(page) {

        const clientsPage = new Clients(page);
        const clients = await clientsPage.getClientsList(page);
        console.log(clients);
        let randomNumber = await this.randomInteger(0, clients.length)
        console.log(randomNumber);
        console.log(clients[randomNumber]);
        return clients[randomNumber];
    }
}

export { library };
