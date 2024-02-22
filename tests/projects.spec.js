import { test, expect } from '@playwright/test';
import { library } from '../utils/library/library';
import { NavigationMenu } from '../utils/pageObjects/navigationMenu';
import { Projects } from '../utils/pageObjects/projects/projects';
import { projects } from '../utils/constants.json';

test('Navigation to projects menu @projects', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);

    await library.loginToTheApplication(page);
    await navigationMenu.navigateToProjects(page);
    await expect(page).toHaveURL(process.env.BASEURL + 'projects');

});

test.only('Check the UI elements in Projects page', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);

    await library.loginToTheApplication(page);
    await navigationMenu.navigateToProjects(page);

    // await library.waitUntilLoaderIsHidden(page);

    const projectsPage = new Projects(page);

    await expect.soft(projectsPage.header).toBeVisible();
    // await expect.soft(projectsPage.header).toHaveText(projects.header);
    await expect.soft(projectsPage.addNewProjectButton).toBeVisible();

    await expect.soft(projectsPage.fastBackwardButton).toBeVisible();
    await expect.soft(projectsPage.stepBackwardButton).toBeVisible();
    await expect.soft(projectsPage.fastForwardButton).toBeVisible();
    await expect.soft(projectsPage.stepForwardButton).toBeVisible();

    await expect.soft(projectsPage.table).toBeVisible();

});

test.only('Verify the UI elements of Add New Project modal @projects @visibility', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);

    await library.loginToTheApplication(page);
    await navigationMenu.navigateToProjects(page);

    const projectsPage = new Projects(page);
    await projectsPage.addNewProjectButton.click();



});