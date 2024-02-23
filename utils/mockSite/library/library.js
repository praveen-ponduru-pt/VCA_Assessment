import { LoginPage } from "../pageObjects/loginPage"
import { expect } from "playwright/test";
import { NavigationMenu } from "../pageObjects/navigationMenu";
import moment from "moment/moment";


const library = {

    /**
     * Login to the application with valid credentials
     * @param {page} page 
     */
    async loginToTheApplication(page) {

        const loginPage = new LoginPage(page);

        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        await this.navigateToTheApplication(page);
        await loginPage.waitUntilLoginPageIsLoaded();
        await loginPage.login(username, password);
    },
    /**
     * Click on logout link and logout of the application
     */
    async logOutOfTheApplication(page) {
        const navigationMenu = new NavigationMenu(page);
        await navigationMenu.logOutLink.click();
        const loginPage = new LoginPage(page);
        await expect.soft(loginPage.header).toBeVisible();
    },

    /**
     * Navigate to the application base url
     * @param {page} page 
     */
    async navigateToTheApplication(page) {

        const baseURL = process.env.BASEURL;
        const loginPage = new LoginPage(page);

        await page.goto(baseURL);
        await loginPage.waitUntilLoginPageIsLoaded();
    },

    /**
     * Waits for the locator to be visible
     * @param {locator} locator 
     */
    async waitForLocatorVisiblity(locator) {

        // Wait for the element located by the provided locator to become visible
        await locator.waitFor({ state: 'visible' });
    },

    /**
     * Verifies the page url is navigated to the specified menu
     * @param {page} page 
     * @param {menu} menu 
     */
    async verifyPageURL(page, menu) {

        const baseURL = process.env.BASEURL;
        await expect(page).toHaveURL(baseURL + menu);
    },

    /**
     * Generates a random number between min and max
     * @param {minimum} min 
     * @param {maximum} max 
     * @returns integer
     */
    async randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    },

    /**
     * Formats the current timestamp and returns it
     * @returns moment
     */
    getCurrentTimeStamp: () => {
        const currentDateTime = moment();
        const formattedTimestamp = currentDateTime.format("YYMMDDHHmmss");
        return formattedTimestamp;
    }

}

export { library };
