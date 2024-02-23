import { test, expect } from '@playwright/test';
import { library } from '../../utils/mockSite/library/library';
import { NavigationMenu } from '../../utils/mockSite/pageObjects/navigationMenu';
import { Projects } from '../../utils/mockSite/pageObjects/projects/projects';
import { projects, URLs } from '../../utils/mockSite/constants.json';
import { testData } from '../../utils/mockSite/data/testData';
let inputData = {
    ...testData.projectDetails(),
    ...testData.updateProjectDetails()
};

test.beforeEach('Login To The Application', async ({ page }) => {
    await library.loginToTheApplication(page);
});

test.afterEach('Login Out Of The Application', async ({ page }) => {
    await library.logOutOfTheApplication(page);
});

test('Navigation to projects menu @projects', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    await navigationMenu.navigateToProjects(page);
    await library.verifyPageURL(page, URLs.projects);
});

test('Verify The UI Elements of Add New Project Modal @projects @visibility @ui', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    const projectsPage = new Projects(page);
    await test.step('Navigate To Projects module', async () => {
        await navigationMenu.navigateToProjects(page);
        await library.verifyPageURL(page, URLs.projects);
    });
    await test.step('Click on Add New Project Button', async () => {
        await projectsPage.addNewProjectButton.click();
    });
    await test.step('Validating Add New Project Modal UI Elements', async () => {
        await projectsPage.validateAddNewProjectModal();
        await expect(await projectsPage.addProjectModal).toBeHidden();
    });
});

test('Verify Add New Project @projects', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    const projectsPage = new Projects(page);
    await test.step('Navigate to projects module', async () => {
        await navigationMenu.navigateToProjects(page);
        await library.verifyPageURL(page, URLs.projects);
    });
    await projectsPage.addNewProject(page, inputData.projectDetails);
    await expect(projectsPage.addProjectModal).toBeHidden();
});

test('Update The Created Project @projects @update', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    const projectsPage = new Projects(page);
    await test.step('Navigate to Projects Module', async () => {
        await navigationMenu.navigateToProjects(page);
        await library.verifyPageURL(page, URLs.projects);
    });
    await test.step('Add New Project', async () => {
        await projectsPage.addNewProject(page, inputData.projectDetails);
        await expect(await projectsPage.addProjectModal).toBeHidden();
    });
    const projectName = inputData.projectDetails.projectName;
    await projectsPage.updateProject(projectName, inputData.updateProjectDetails);
    await expect(projectsPage.addProjectModal).toBeHidden();
});

test('Delete The Created Project @projects', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    const projectsPage = new Projects(page);
    const projectName = inputData.projectDetails.projectName;
    await test.step('Login to application and navigate to projects', async () => {
        await library.loginToTheApplication(page);
        await navigationMenu.navigateToProjects(page);
        await expect(page).toHaveURL(process.env.BASEURL + 'projects');
    });
    await test.step('Add A New Project project', async () => {
        await projectsPage.addNewProject(page, inputData.projectDetails);
        await expect(await projectsPage.addProjectModal).toBeHidden();
    });
    await test.step('Delete the created project', async () => {
        await projectsPage.deleteProject(projectName);
        await projectsPage.validateDeletedProject(projectName);
    });
});