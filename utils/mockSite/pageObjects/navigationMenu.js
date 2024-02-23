import { Projects } from "./projects/projects";
import { Clients } from "./clients/clients";

class NavigationMenu {
    constructor(page) {

        this.page = page;
        this.projectsMenu = page.locator('div.column').getByRole('link', { name: 'Projects' });
        this.clientsMenu = page.locator('div.column').getByRole('link', { name: 'Clients' });
    }

    /**
     * This method is used to navigate to projects page
     * @param page 
     */
    async navigateToProjects(page) {

        await this.projectsMenu.click();
        const projectsPage = new Projects(page);
        await projectsPage.waitUntilProjectsPageIsLoaded();
    }

    /**
    * This method is used to navigate to clients page
    * @param page 
    */
    async navigateToClients(page) {

        await this.clientsMenu.click();
        const clientsPage = new Clients(page);
        await clientsPage.waitUntilClientsPageIsLoaded();
    }
}

export { NavigationMenu };
