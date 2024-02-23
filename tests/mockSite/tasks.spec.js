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
    ...testData.taskDetails()
};

test.beforeEach("login to application", async ({ page }) => {
    await library.loginToTheApplication(page);
});

test.describe("Testcases Related To Tasks @tasks", () => {

    test("Verify the visibility of element in tasks creation page", async ({ page }) => {
        const navigationMenu = new NavigationMenu(page);
        const projectsPage = new Projects(page);
        await test.step("Navigate To Projects Module", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create a project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        await projectsPage.projectNameCell.filter({ hasText: inputData.projectDetails.projectName }).click();
        const createTask = new Tasks(page);
        await expect.soft(createTask.editProjectButton).toBeVisible();
        await expect.soft(createTask.newHeader).toBeVisible();
        await expect.soft(createTask.inProgressHeader).toBeVisible();
        await expect.soft(createTask.issuesFoundHeader).toBeVisible();
        await expect.soft(createTask.completedHeader).toBeVisible();
    });

    test("Create A New Task", async ({ page }) => {
        const projectsPage = new Projects(page);
        await test.step("Navigate To Projects Module", async () => {
            const navigationMenu = new NavigationMenu(page);
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create A Project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        await projectsPage.projectNameCell.filter({ hasText: projectName }).click();
        await test.step("Add A New Task", async () => {
            const createTask = new Tasks(page);
            await createTask.createNewTask(projectName, inputData.taskDetails);
            await expect.soft(page.getByText(inputData.taskDetails.taskName)).toBeVisible();
        });
    });

    test("Drag Tasks From New to Inprogress", async ({ page }) => {
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        const navigationMenu = new NavigationMenu(page);
        await test.step("Navigate to Projects Module", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create a project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        await projectsPage.projectNameCell.filter({ hasText: projectName }).click();
        await test.step("Add new task", async () => {
            await createTask.createNewTask(projectName, inputData.taskDetails);
            await expect.soft(page.getByText(inputData.taskDetails.taskName)).toBeVisible();
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
        await projectsPage.projectNameCell.filter({ hasText: projectName }).click();
        await test.step("Add A New Task", async () => {
            await createTask.createNewTask(projectName, inputData.taskDetails);
            await expect.soft(page.getByText(inputData.taskDetails.taskName)).toBeVisible();
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
        await projectsPage.projectNameCell.filter({ hasText: projectName }).click();
        await test.step("Add new task", async () => {
            await createTask.createNewTask(projectName, inputData.taskDetails);
            await expect.soft(page.getByText(inputData.taskDetails.taskName)).toBeVisible();
        });
        await test.step("Edit Task Details", async () => {
            await createTask.editTask();
            await createTask.fillDetailsInEditTask();
            await expect(page.getByText(createTask.editedTitle)).toBeVisible();
        });
    });

    test("Verify the visibility of UI elements in tasks deletion page", async ({ page }) => {
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
        await projectsPage.projectNameCell.filter({ hasText: projectName }).click();
        await test.step("Add new task", async () => {
            await createTask.createNewTask(projectName, inputData.taskDetails);
            await expect.soft(page.getByText(inputData.taskDetails.taskName)).toBeVisible();
        });
        await test.step("Validate the visibility of UI elements in delete task", async () => {
            const tasktitle = createTask.newTitle;
            await createTask.deleteTask();
            await expect.soft(createTask.crossIcon).toBeVisible();
            await expect.soft(createTask.deleteNotification).toHaveText(`Are you sure you want to delete client ${inputData.taskDetails.taskName}?`);
            await expect.soft(createTask.okButton).toBeVisible();
            await expect.soft(createTask.cancelButton).toBeVisible();
        });
    });

    test("Delete a task @tasks", async ({ page }) => {
        const navigationMenu = new NavigationMenu(page);
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        await test.step("Navigate to Projects", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create a project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        await projectsPage.projectNameCell.filter({ hasText: projectName }).click();
        await test.step("Add new task", async () => {
            await createTask.createNewTask(projectName, inputData.taskDetails);
            await expect.soft(page.getByText(inputData.taskDetails.taskName)).toBeVisible();
        });
        await test.step("Delete a task", async () => {
            await createTask.deleteTask();
            await createTask.okButtonInDeleteModal();
            await expect(createTask.alltasksStatus.getByText(inputData.taskDetails.taskName)).toBeHidden();
        });
    });

    test.only("Add activity UI elements visibility", async ({ page }) => {
        const navigationMenu = new NavigationMenu(page);
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        await test.step("Navigate to Projects", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create a project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        await projectsPage.projectNameCell.filter({ hasText: projectName }).click();
        await test.step("Add new task", async () => {
            await createTask.createNewTask(projectName, inputData.taskDetails);
            await expect(page.getByText(inputData.taskDetails.taskName)).toBeVisible();
        });
        await test.step("Navigate to activity page and validate the elements visibility", async () => {
            await createTask.NavigateToActivityPage(inputData.taskDetails.taskName);
            await createTask.validateActivityPage();
        });
    });

    test("Add activity functionality for a new task", async ({ page }) => {
        const navigationMenu = new NavigationMenu(page);
        const projectsPage = new Projects(page);
        const createTask = new Tasks(page);
        let activityDetails = testData.createActivityDetails();
        await test.step("Navigate to Projects", async () => {
            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });
        await test.step("Create a project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        const projectName = inputData.projectDetails.projectName;
        await projectsPage.projectNameCell.filter({ hasText: projectName }).click();
        await test.step("Add new task", async () => {
            await createTask.createNewTask(projectName, inputData.taskDetails);
            await expect.soft(page.getByText(inputData.taskDetails.taskName)).toBeVisible();
        });
        await test.step("Navigate to activity page and add activity for the created task", async () => {
            await createTask.NavigateToActivityPage(inputData.taskDetails.taskName);
            await createTask.createActivity(activityDetails);
        });
    });
})