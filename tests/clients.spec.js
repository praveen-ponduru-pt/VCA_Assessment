import { test, expect } from '@playwright/test';
import { library } from '../utils/library/library';
import { NavigationMenu } from '../utils/pageObjects/navigationMenu';
import { Projects } from '../utils/pageObjects/projects/projects';
import { Clients } from '../utils/pageObjects/clients/clients';
import { Tasks } from '../utils/pageObjects/projects/tasks';

test('navigate to Clients Page', async ({ page }) => {

    const clientsPage = new Clients(page);
    const navigationMenu = new NavigationMenu(page);

    await library.loginToTheApplication(page);
    await navigationMenu.navigateToClients(page);

    let random = await library.getARandomClient(page);
    console.log(random);
});