import { test, expect } from '@playwright/test';
import { library } from '../../utils/mockSite/library/library';
import { NavigationMenu } from '../../utils/mockSite/pageObjects/navigationMenu';
import { Projects } from '../../utils/mockSite/pageObjects/projects/projects';
import { Tasks } from '../../utils/mockSite/pageObjects/projects/tasks';
import { testData } from '../../utils/mockSite/data/testData';
import { URLs } from '../../utils/mockSite/constants.json';

let inputData = {
    ...testData.projectDetails(),
    ...testData.updateProjectDetails(),
    ...testData.taskDetails(),
    ...testData.createActivityDetails()
};

test.beforeEach("Login To The Application", async ({ page }) => {
    await library.loginToTheApplication(page);
});

test.afterEach('Login Out Of The Application', async ({ page }) => {
    await library.logOutOfTheApplication(page);
});

test.describe("Test Cases Related To Tasks @tasks", () => {

    test("Verify The Visibility Of Element In Tasks Creation Page", async ({ page }) => {
        const navigationMenu = new NavigationMenu(page);
        const projectsPage = new Projects(page);
        await test.step("Navigate To Projects Module", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create A New Project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        await projectsPage.projectNameCell.filter({ hasText: projectName }).first().click();
        const createTask = new Tasks(page);
        await expect.soft(createTask.editProjectButton).toBeVisible();
        await expect.soft(createTask.newHeader).toBeVisible();
        await expect.soft(createTask.inProgressHeader).toBeVisible();
        await expect.soft(createTask.issuesFoundHeader).toBeVisible();
        await expect.soft(createTask.completedHeader).toBeVisible();
    });

    test("Create A New Task @create", async ({ page }) => {
        const navigationMenu = new NavigationMenu(page);
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        await test.step("Navigate To Projects Module", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create A New Project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        const taskName = inputData.taskDetails.taskName + library.getCurrentTimeStamp();
        await projectsPage.projectNameCell.filter({ hasText: projectName }).first().click();
        await test.step("Add A New Task", async () => {
            await createTask.createNewTask(projectName, taskName);
            await expect.soft(page.getByText(taskName)).toBeVisible();
        });
    });

    test("Drag Tasks From New to InProgress", async ({ page }) => {
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        const navigationMenu = new NavigationMenu(page);
        await test.step("Navigate to Projects Module", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create A Project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        const taskName = inputData.taskDetails.taskName + library.getCurrentTimeStamp();
        await projectsPage.projectNameCell.filter({ hasText: projectName }).first().click();
        await test.step("Add A New Task", async () => {
            await createTask.createNewTask(projectName, taskName);
            await expect.soft(page.getByText(taskName)).toBeVisible();
        });
        await test.step("Drag And Drop A Task", async () => {
            await createTask.dragToDestination();
        });
    });

    test("Edit The Task", async ({ page }) => {
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        const navigationMenu = new NavigationMenu(page);
        await test.step("Navigate to Projects", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create a project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        const taskName = inputData.taskDetails.taskName + library.getCurrentTimeStamp();
        await projectsPage.projectNameCell.filter({ hasText: projectName }).first().click();
        await test.step("Add new task", async () => {
            await createTask.createNewTask(projectName, taskName);
            await expect.soft(page.getByText(taskName)).toBeVisible();
        });
        await test.step("Edit Task Details", async () => {
            await createTask.editTask();
            await createTask.fillDetailsInEditTask();
            await expect(page.getByText(createTask.editedTitle)).toBeVisible();
        });
    });

    test("Delete a task @tasks @delete", async ({ page }) => {
        const navigationMenu = new NavigationMenu(page);
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        await test.step("Navigate To Projects Module", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create A New Project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        const taskName = inputData.taskDetails.taskName + library.getCurrentTimeStamp();
        await projectsPage.projectNameCell.filter({ hasText: projectName }).first().click();
        await test.step("Add A New Task", async () => {
            await createTask.createNewTask(projectName, taskName);
            await expect.soft(page.getByText(taskName)).toBeVisible();
        });
        await test.step("Delete A Task", async () => {
            await createTask.deleteTask();
            await createTask.okButtonInDeleteModal();
            await expect(createTask.alltasksStatus.getByText(taskName)).toBeHidden();
        });
    });
})