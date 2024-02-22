import { Projects } from "./projects/projects";

class NavigationMenu {
    constructor(page) {

        this.page = page;
        this.projectsMenu = page.locator('div.column').getByRole('link', { name: 'Projects' });

    }

    async navigateToProjects(page) {

        await this.projectsMenu.click();
        const projectsPage = new Projects(page);

        projectsPage.waitUntilProjectsPageIsLoaded();
    }
}

export { NavigationMenu };
