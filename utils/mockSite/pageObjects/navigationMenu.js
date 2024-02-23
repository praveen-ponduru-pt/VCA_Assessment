import { Projects } from "./projects/projects";
import { Clients } from "./clients/clients";

class NavigationMenu {
    constructor(page) {
        this.page = page;
        this.projectsMenu = page.locator('div.column').getByRole('link', { name: 'Projects' });
        this.clientsMenu = page.locator('div.column').getByRole('link', { name: 'Clients' });
        this.logOutLink = page.getByRole('link', { name: 'Logout' });
    }

    /**
     * Click on Projects menu icon and wait until Projects page is loaded
     * @param page 
     */
    async navigateToProjects(page) {
        await this.projectsMenu.click();
        const projectsPage = new Projects(page);
        await projectsPage.waitUntilProjectsPageIsLoaded();
    }

    /**
    * Click on Projects menu icon and wait until Clients page is loaded
    * @param page 
    */
    async navigateToClients(page) {
        await this.clientsMenu.click();
        const clientsPage = new Clients(page);
        await clientsPage.waitUntilClientsPageIsLoaded();
    }
}

export { NavigationMenu };