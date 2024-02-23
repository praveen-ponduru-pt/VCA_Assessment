import { test, expect } from '@playwright/test';
import { library } from '../../utils/mockSite/library/library';
import { NavigationMenu } from '../../utils/mockSite/pageObjects/navigationMenu';
import { Projects } from '../../utils/mockSite/pageObjects/projects/projects';
import { Clients } from '../../utils/mockSite/pageObjects/clients/clients';
import { Tasks } from '../../utils/mockSite/pageObjects/projects/tasks';

test('navigate to Clients Page', async ({ page }) => {

    const clientsPage = new Clients(page);
    const navigationMenu = new NavigationMenu(page);

    await library.loginToTheApplication(page);
    await navigationMenu.navigateToClients(page);

    let random = await library.getARandomClient(page);
});