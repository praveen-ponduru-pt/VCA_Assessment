import { test, expect } from '@playwright/test';
import { library } from '../utils/library/library';

test('Login to the Application @login', async ({ page }) => {

    await library.loginToTheApplication(page);
});