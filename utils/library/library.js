import { LoginPage } from "../pageObjects/loginPage"

const library = {

    async loginToTheApplication(page) {

        const loginPage = new LoginPage(page);

        const baseURL = process.env.BASEURL;
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        await page.goto(baseURL);
        await loginPage.login(username, password);
    },

    async navigateToTheApplication(page) {

        const baseURL = process.env.BASEURL;
        await page.goto(baseURL);
    },

    async waitUntilLoaderIsHidden(page) {

        await page.waitForSelector('iframe.snapshot-visible');

        // Get the frame element handle
        const frameHandle = await page.waitForSelector('iframe.snapshot-visible');

        // Wait for the frame to load
        const frame = await frameHandle.contentFrame();

        // Wait for the element with class 'is-loading' to become hidden inside the frame
        await frame.waitForSelector('.is-loading', { state: 'hidden' });
    }

}

export { library };
