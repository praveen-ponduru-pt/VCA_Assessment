import { test, expect } from '@playwright/test';
import { library } from '../../utils/mockSite/library/library';
import { NavigationMenu } from '../../utils/mockSite/pageObjects/navigationMenu';
import { Projects } from '../../utils/mockSite/pageObjects/projects/projects';
import { Tasks } from '../../utils/mockSite/pageObjects/projects/tasks';
import { testData } from '../../utils/mockSite/data/testData';
import { URLs } from '../../utils/mockSite/constants.json';

let inputData = {
    ...testData.projectDetails(),
    ...testData.updateProjectDetails()
};


test.beforeEach("login to application", async ({ page }) => {
    await library.loginToTheApplication(page);
});

test.describe("Testcases related to tasks @tasks", () => {

    test.only("Verify the visibility of element in tasks creation page", async ({ page }) => {
        const navigationMenu = new NavigationMenu(page);
        const projectsPage = new Projects(page);

        await test.step("Navigate to projects", async () => {

            await navigationMenu.navigateToProjects(page);
            await library.verifyPageURL(page, URLs.projects);
        });

        await test.step("Create a project", async () => {
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });
        await projectsPage.addNewProjectButton.click();

        const createTask = new Tasks(page);
        await expect.soft(createTask.editProjectButton).toBeVisible();
        await expect.soft(createTask.newHeader).toBeVisible();
        await expect.soft(createTask.inProgressHeader).toBeVisible();
        await expect.soft(createTask.issuesFoundHeader).toBeVisible();
        await expect.soft(createTask.completedHeader).toBeVisible();
    });

    test("Create a new task", async ({ page }) => {

        await test.step("Navigate to projects", async () => {
            const navigationMenu = new NavigationMenu(page);
            await navigationMenu.navigateToProjects(page);
            await expect(page).toHaveURL(process.env.BASEURL + 'projects');
        });

        await test.step("Create a project", async () => {
            const projectsPage = new Projects(page);
            await projectsPage.addNewProject(page, inputData.projectDetails);
            await projectsPage.sortClientsByDesc();
        });

        await test.step("Add new task", async () => {
            const createTask = new Tasks(page);
            await createTask.createNewTask();
            await expect(page.getByText(createTask.newTitle)).toBeVisible();
        });
    });

    test("Drag tasks from new to inprogress", async ({ page }) => {

        await test.step("Navigate to projects", async () => {
            const navigationMenu = new NavigationMenu(page);
            await navigationMenu.navigateToProjects(page);
            await expect(page).toHaveURL(process.env.BASEURL + 'projects');
        });

        await test.step("Create a project", async () => {
            const projectsPage = new Projects(page);
            await projectsPage.addNewProject();
            await page.getByText('Test_task').first().click();
        });

        const createTask = new Tasks(page);
        await test.step("Add new task", async () => {
            await createTask.createNewTask();
            await expect(page.getByText(createTask.newTitle)).toBeVisible();
        });

        await test.step("Drag and drop for a task", async () => {
            await createTask.dragToDestination();
        });
    })
    test("Visibility of elements in edit task", async ({ page }) => {

        await test.step("Navigate to projects", async () => {
            const navigationMenu = new NavigationMenu(page);
            await navigationMenu.navigateToProjects(page);
            await expect(page).toHaveURL(process.env.BASEURL + 'projects');
        });

        await test.step("Create a project", async () => {
            const projectsPage = new Projects(page);
            await projectsPage.addNewProject();
            await page.getByText('Test_task').first().click();
        });

        const createTask = new Tasks(page);
        await test.step("Add new task", async () => {
            await createTask.createNewTask();
            await expect(page.getByText(createTask.newTitle)).toBeVisible();
        });

        await test.step("Visibility pf elements while editing the task", async () => {
            await createTask.editTask();
            await expect(createTask.editTaskHeader).toHaveText("Edit Task");
            await expect(createTask.crossIcon).toBeVisible();
            await expect(createTask.generalTab).toBeVisible();
            await expect(createTask.estimationTab).toBeVisible();
            await expect(createTask.editTitle).toBeVisible();
            await expect(createTask.description).toBeVisible();
            await expect(createTask.notes).toBeVisible();
        });
    });

    test("Edit the task", async ({ page }) => {
        await test.step("Navigate to projects", async () => {
            const navigationMenu = new NavigationMenu(page);
            await navigationMenu.navigateToProjects(page);
            await expect(page).toHaveURL(process.env.BASEURL + 'projects');
        });

        await test.step("Create a project", async () => {
            const projectsPage = new Projects(page);
            await projectsPage.addNewProject();
            await page.getByText('Test_task').first().click();
        });

        const createTask = new Tasks(page);
        await test.step("Add new task", async () => {
            await createTask.createNewTask();
            await expect(page.getByText(createTask.newTitle)).toBeVisible();
        });

        await test.step("edit task details", async () => {
            await createTask.editTask();
            await createTask.fillDetailsInEditTask();
            await expect(page.getByText(createTask.editedTitle)).toBeVisible();
        });
    });

    test("Verify the visibility of UI elements in tasks deletion page @Delete task", async ({ page }) => {

        await test.step("Navigate to projects", async () => {
            const navigationMenu = new NavigationMenu(page);
            await navigationMenu.navigateToProjects(page);
            await expect(page).toHaveURL(process.env.BASEURL + 'projects');
        });

        await test.step("Create a project", async () => {
            const projectsPage = new Projects(page);
            await projectsPage.addNewProject();
            await page.getByText('Test_task').first().click();
        });
        const createTask = new Tasks(page);
        let tasktitle = await createTask.createNewTask();
        await test.step("Add new task", async () => {
            await expect(page.getByText(createTask.newTitle)).toBeVisible();
        });
        await test.step("Validate the visibility of UI elements in delete task", async () => {
            await createTask.deleteTask();
            await expect.soft(createTask.crossIcon).toBeVisible();
            await expect.soft(createTask.deleteNotification).toHaveText(`Are you sure you want to delete client ${tasktitle} ?`);
            await expect.soft(createTask.okButton).toBeVisible();
            await expect.soft(createTask.cancelButton).toBeVisible();
        });
    });


    test("Delete a task @tasks", async ({ page }) => {
        await test.step("Navigate to projects", async () => {
            const navigationMenu = new NavigationMenu(page);
            await navigationMenu.navigateToProjects(page);
            await expect(page).toHaveURL(process.env.BASEURL + 'projects');
        });

        await test.step("Create a project", async () => {
            const projectsPage = new Projects(page);
            await projectsPage.addNewProject();
            await page.getByText('Test_task').first().click();
        });

        const createTask = new Tasks(page);
        let tasktitle = await createTask.createNewTask();
        await test.step("Add new task", async () => {
            await expect(page.getByText(createTask.newTitle)).toBeVisible();
        });

        await test.step("Delete a task", async () => {
            await createTask.deleteTask();
            await createTask.okButtonIndelete();
            await expect(createTask.alltasksStatus.getByText(tasktitle)).toBeHidden();
        });

    });

})
