import { Projects } from "./projects/projects";
import { Clients } from "./clients/clients";

class NavigationMenu {
    constructor(page) {

        this.page = page;
        this.projectsMenu = page.locator('div.column').getByRole('link', { name: 'Projects' });
        this.clientsMenu = page.locator('div.column').getByRole('link', { name: 'Clients' });
    }

    async navigateToProjects(page) {

        await this.projectsMenu.click();
        const projectsPage = new Projects(page);

        await projectsPage.waitUntilProjectsPageIsLoaded();
    }

    async navigateToClients(page) {

        await this.clientsMenu.click();
        const clientsPage = new Clients(page);

        await clientsPage.waitUntilClientsPageIsLoaded();
    }
}

export { NavigationMenu };
