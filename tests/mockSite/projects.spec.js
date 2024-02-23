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

test.beforeEach('Login to the Application', async ({ page }) => {
    await library.loginToTheApplication(page);
});

test('Navigation to projects menu @projects', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    await navigationMenu.navigateToProjects(page);
    await library.verifyPageURL(page, URLs.projects);
});

test('Check the UI elements in Projects page @projects @visibility @ui', async ({ page }) => {

    await test.step('Navigate to projects module', async () => {
        const navigationMenu = new NavigationMenu(page);
        await navigationMenu.navigateToProjects(page);
        await library.verifyPageURL(page, URLs.projects);
    });

    await test.step('Validating Projects module UI elements', async () => {
        const projectsPage = new Projects(page);
        projectsPage.validateProjectsPage(page);
    });
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
        await projectsPage.addNewProject(page, inputData.projectDetails);
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

test('Edit the created project @projects', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    const projectsPage = new Projects(page);
    await test.step('Navigate to Projects Module', async () => {
        await navigationMenu.navigateToProjects(page);
        await library.verifyPageURL(page, URLs.projects);
    });
    await test.step('Add New Project', async () => {
        await projectsPage.addNewProject(inputData.projectDetails);
        await expect(await projectsPage.addProjectModal).toBeHidden();
    });
    const projectName = inputData.projectDetails.projectName;
    await projectsPage.updateProject(projectName, inputData.updateProjectDetails);
    await expect(projectsPage.addProjectModal).toBeHidden();
});

test('Verify the UI elements of Delete Project page @projects @visibility', async ({ page }) => {
    const navigationMenu = new NavigationMenu(page);
    const projectsPage = new Projects(page);
    await test.step('Navigate to projects module', async () => {
        await navigationMenu.navigateToProjects(page);
        await library.verifyPageURL(page, URLs.projects);
    });
    await test.step('Add new project', async () => {
        await projectsPage.addNewProject(page, inputData.projectDetails);
        await expect(await projectsPage.addProjectModal).toBeHidden();
    });
    const projectName = inputData.projectDetails.projectName;
    await test.step('Validating Delete project modal UI elements', async () => {
        await projectsPage.viewDeleteProjectModal(projectName);
        await projectsPage.validateDeleteProjectModal(projectName);
        await expect(projectsPage.deleteProjectHeader, "Validating the delete project page header").toHaveText(projects.deleteProjectHeader);
        const actualMsg = projects.deleteProjectConfirmationMessage + projectName + "?";
        await expect(projectsPage.confirmationMsg, "Validating the message displayed in delete project page").toHaveText(actualMsg);
    });
});

test('Delete project @projects', async ({ page }) => {

    const navigationMenu = new NavigationMenu(page);
    const projectsPage = new Projects(page);
    const projectName = inputData.projectDetails.projectName;

    await test.step('Login to application and navigate to projects', async () => {
        await library.loginToTheApplication(page);
        await navigationMenu.navigateToProjects(page);
        await expect(page).toHaveURL(process.env.BASEURL + 'projects');
    });

    await test.step('Add new project', async () => {
        await projectsPage.addNewProject(page, inputData.projectDetails);
        await expect(await projectsPage.addProjectModal).toBeHidden();
    });

    await test.step('Delete the created project', async () => {

        await projectsPage.deleteProject(projectName);
        await projectsPage.validateDeletedProject(projectName);
    });
});