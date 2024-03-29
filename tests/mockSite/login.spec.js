import { test, expect } from '@playwright/test';
import { library } from '../../utils/mockSite/library/library';
import { LoginPage } from '../../utils/mockSite/pageObjects/loginPage';
import { login, credentials } from '../../utils/mockSite/constants.json'

test.describe("Valid Login Functionality Scenarios @login @validLogins", async () => {

    test('Login to the Application @login', async ({ page }) => {
        await library.loginToTheApplication(page);
    });

    test('Check The Visibility Of All The Fields @login @visibility', async ({ page }) => {
        await library.navigateToTheApplication(page);
        const loginPage = new LoginPage(page);
        await expect.soft(loginPage.header).toHaveText(login.header);
        await expect.soft(loginPage.subtitle).toHaveText(login.subtitle);
        await expect.soft(loginPage.emailAddress).toBeVisible();
        await expect.soft(loginPage.password).toBeVisible();
        await expect.soft(loginPage.rememberMeCheckbox).toBeVisible();
        await expect.soft(loginPage.loginButton).toBeVisible();
    });
});

test.describe("Invalid Login Functionality Scenarios @login @invalidLogins", async () => {

    test('Login With Invalid Credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await library.navigateToTheApplication(page, loginPage.header);
        await expect.soft(loginPage.header, "Validating login page header").toHaveText(login.header);
        await loginPage.login(credentials.incorrectEmail, credentials.incorrectPassword);
        await expect(loginPage.errorMessageBox, " Validating the invalid credintials error displayed").toHaveText(login.invalidCredentialsMessage);
    });

    test('Login With Invalid Username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await library.navigateToTheApplication(page, loginPage.header);
        await expect.soft(loginPage.header, "Validating login page header").toHaveText(login.header);
        await loginPage.login(credentials.invalidEmailAddress, credentials.incorrectPassword);
        await expect(loginPage.invalidMessage, "Validating the invalid message displayed").toHaveText(login.invalidEmailMessage);
    });

    test('Login with username field as empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await library.navigateToTheApplication(page, loginPage.header);
        await expect.soft(loginPage.header, "Validating login page header").toHaveText(login.header);
        await loginPage.login(credentials.emptyString, credentials.incorrectPassword);
        await expect(loginPage.invalidMessage, "Validating the email field required message").toHaveText(login.emailFieldRequiredMessage);
    });

    test('Login with password field as empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await library.navigateToTheApplication(page, loginPage.header);
        await expect.soft(loginPage.header, "Validating login page header").toHaveText(login.header);
        await loginPage.login(credentials.incorrectEmail, credentials.emptyString);
        await expect(loginPage.invalidMessage, "Validating the password field required message").toHaveText(login.passwordFieldRequiredMessage);
    });
})