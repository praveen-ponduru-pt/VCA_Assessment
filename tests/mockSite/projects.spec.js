import { test, expect } from '@playwright/test';
import { library } from '../../utils/mockSite/library/library';
import { NavigationMenu } from '../../utils/mockSite/pageObjects/navigationMenu';
import { Projects } from '../../utils/mockSite/pageObjects/projects/projects';
import { Clients } from '../../utils/mockSite/pageObjects/clients/clients';
import { projects, URLs } from '../../utils/mockSite/constants.json';
import { testData } from '../../utils/mockSite/data/testData';
let inputData = {
    ...testData.projectDetails(),
    ...testData.updateProjectDetails()
};

test('Navigation to projects menu @projects', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);

    await library.loginToTheApplication(page);
    await navigationMenu.navigateToProjects(page);
    await expect(page).toHaveURL(process.env.BASEURL + 'projects');

});

test('Check the UI elements in Projects page @projects', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);

    await library.loginToTheApplication(page);
    await navigationMenu.navigateToProjects(page);
    await expect(page).toHaveURL(process.env.BASEURL + 'projects');

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

test('Verify the UI elements of Add New Project modal @projects @visibility', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);

    await library.loginToTheApplication(page);
    await navigationMenu.navigateToProjects(page);
    await expect(page).toHaveURL(process.env.BASEURL + 'projects');

    const projectsPage = new Projects(page);
    await projectsPage.addNewProjectButton.click();
    await expect.soft(projectsPage.closeButton).toBeVisible();

    await expect.soft(projectsPage.nameField).toBeVisible();
    await expect.soft(projectsPage.clientField).toBeVisible();
    await expect.soft(projectsPage.stageDropdown).toBeVisible();


    await expect.soft(projectsPage.descriptionField).toBeVisible();
    await expect.soft(projectsPage.notesField).toBeVisible();
});

test('Verify Add New Project @projects', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);
    await library.loginToTheApplication(page);

    const projectsPage = new Projects(page);

    await navigationMenu.navigateToProjects(page);
    await library.verifyPageURL(page, URLs.projects);

    await projectsPage.addNewProject(page, inputData.projectDetails);
    await expect(projectsPage.addProjectModal).toBeHidden();
});

test('Edit the created project @projects', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);
    await library.loginToTheApplication(page);

    const projectsPage = new Projects(page);

    await navigationMenu.navigateToProjects(page);
    await library.verifyPageURL(page, URLs.projects);

    await projectsPage.addNewProject(page, inputData.projectDetails);
    await expect(projectsPage.addProjectModal).toBeHidden();

    const projectName = inputData.projectDetails.projectName;
    await projectsPage.updateProject(projectName, inputData.updateProjectDetails);
    await expect(projectsPage.addProjectModal).toBeHidden();
});
