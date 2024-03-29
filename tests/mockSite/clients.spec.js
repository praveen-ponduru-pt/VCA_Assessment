import { test, expect } from '@playwright/test';
import { library } from '../../utils/mockSite/library/library';
import { NavigationMenu } from '../../utils/mockSite/pageObjects/navigationMenu';
import { Clients } from '../../utils/mockSite/pageObjects/clients/clients';
import { URLs } from '../../utils/mockSite/constants.json';

test('Navigate To Clients Page', async ({ page }) => {
    const clientsPage = new Clients(page);
    const navigationMenu = new NavigationMenu(page);
    await library.loginToTheApplication(page);
    await navigationMenu.navigateToClients(page);
    await library.verifyPageURL(page, URLs.clients)
});