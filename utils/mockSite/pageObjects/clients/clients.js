import { library } from "../../library/library";
import { NavigationMenu } from "../navigationMenu";

class Clients {
    constructor(page) {
        this.page = page;
        this.header = page.locator('div.container>section>div>div>h1');
        this.table = page.locator('tbody>tr:first-child>td:first-child');
    }

    async waitUntilClientsPageIsLoaded() {

        await library.waitForLocatorVisiblity(this.table);
    }

    async getClientsList(page) {

        const navigationMenu = new NavigationMenu(page);
        await navigationMenu.navigateToClients(page);

        // Extract all cells from the first column of the table
        const cells = await page.$$('table tr td:first-child');

        // Extract text content from each cell and store it in an array
        const values = [];
        for (const cell of cells) {
            const text = await cell.textContent();
            values.push(text.trim());
        }
        return values;
    }


    async getARandomClient(page) {

        const clients = await this.getClientsList(page);

        let randomNumber = await library.randomInteger(0, clients.length);
        return clients[randomNumber];
    }

}

export { Clients };
