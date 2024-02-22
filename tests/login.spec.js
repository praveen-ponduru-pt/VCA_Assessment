import { test, expect } from '@playwright/test';
import { library } from '../utils/library/library';
import { LoginPage } from '../utils/pageObjects/loginPage';
import { login } from '../utils/constants.json'

test('Login to the Application @login', async ({ page }) => {

    await library.loginToTheApplication(page);
});

test('Check the visibility of all the fields @login @visibility', async ({ page }) => {

    await library.navigateToTheApplication(page);

    const loginPage = new LoginPage(page);
    await expect.soft(loginPage.header).toBeVisible();
    await expect.soft(loginPage.header).toHaveText(login.header);

    await expect.soft(loginPage.subtitle).toBeVisible();
    await expect.soft(loginPage.subtitle).toHaveText(login.subtitle);

    await expect.soft(loginPage.emailAddress).toBeVisible();
    await expect.soft(loginPage.password).toBeVisible();
    await expect.soft(loginPage.rememberMeCheckbox).toBeVisible();
    await expect.soft(loginPage.loginButton).toBeVisible();
});
