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

    test("Visibility Of Elements In Edit Task", async ({ page }) => {
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        const navigationMenu = new NavigationMenu(page);
        await test.step("Navigate to Projects", async () => {
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
        await test.step("Visibility Of Elements While Editing The Task", async () => {
            await createTask.editTask();
            await expect.soft(createTask.editTaskHeader).toHaveText("Edit Task");
            await expect.soft(createTask.crossIcon).toBeVisible();
            await expect.soft(createTask.generalTab).toBeVisible();
            await expect.soft(createTask.estimationTab).toBeVisible();
            await expect.soft(createTask.editTitle).toBeVisible();
            await expect.soft(createTask.description).toBeVisible();
            await expect.soft(createTask.notes).toBeVisible();
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

    test("Verify The Visibility Of UI Elements In Delete Task Modal", async ({ page }) => {
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
        await test.step("Validating The Visibility Of UI Elements In Delete Task Modal", async () => {
            await createTask.deleteTask();
            await expect.soft(createTask.crossIcon).toBeVisible();
            await expect.soft(createTask.deleteNotification).toHaveText(`Are you sure you want to delete client ${taskName}?`);
            await expect.soft(createTask.okButton).toBeVisible();
            await expect.soft(createTask.cancelButton).toBeVisible();
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

    test("Add activity UI elements visibility", async ({ page }) => {
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
        await test.step("Navigate To Activity Page And Validate The Elements Visibility", async () => {
            await createTask.NavigateToActivityPage(taskName);
            await createTask.validateActivityPage();
        });
    });

    test("Add Activity For A New Task", async ({ page }) => {
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
        const activityDetails = inputData.createActivityDetails;
        await projectsPage.projectNameCell.filter({ hasText: projectName }).first().click();
        await test.step("Add A New Task", async () => {
            await createTask.createNewTask(projectName, taskName);
            await expect.soft(page.getByText(taskName)).toBeVisible();
        });
        await test.step("Navigate To Activity Page And Add Activity For The Created Task", async () => {
            await createTask.NavigateToActivityPage(taskName);
            await createTask.createActivity(activityDetails);
        });
    });
})