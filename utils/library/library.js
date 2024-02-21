import { LoginPage } from "../pageObjects/loginPage"

const library = {

    async loginToTheApplication(page) {

        const loginPage = new LoginPage(page);

        const baseURL = process.env.BASEURL;
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;

        await page.goto(baseURL);
        await loginPage.login(username, password);
    }
}

export { library };
