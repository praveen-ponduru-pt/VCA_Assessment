import { test, expect } from '@playwright/test';
import { library } from '../utils/library/library';
import { NavigationMenu } from '../utils/pageObjects/navigationMenu';
import { Projects } from '../utils/pageObjects/projects/projects';
import { Tasks } from '../utils/pageObjects/projects/tasks';

test.describe("Login to new task creation", () => {

    test("Create a new task", async ({ page }) => {

        await test.step("Login into the applicaiton", async () => {
            await library.loginToTheApplication(page);
        });

        await test.step("Navigate to projects module", async () => {
            const navigationMenu = new NavigationMenu(page);
            await navigationMenu.navigateToProjects(page);
            await expect(page).toHaveURL(process.env.BASEURL + 'projects');
        });

        await test.step("Create a project", async () => {
            const projectsPage = new Projects(page);
            await projectsPage.addNewProject();
            await page.waitForLoadState();
        });

        await test.step("Add new task", async () => {
            const createTask = new Tasks(page);
            await createTask.createNewTask();
            await expect(page.getByText(createTask.newTitle)).toBeVisible();
        });
    });
});