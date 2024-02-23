import { library } from "../../library/library";

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

        // Wait for the table to appear on the page
        // await page.waitForSelector();

        // Extract all cells from the first column of the table
        const cells = await page.$$('table tr td:first-child');

        // Extract text content from each cell and store it in an array
        const values = [];
        for (const cell of cells) {
            const text = await cell.textContent();
            values.push(text.trim());
        }
        console.log(values);
        return values;
    }


    async getARandomClient(page) {

        const clients = await this.getClientsList(page);
        console.log(clients);

        let randomNumber = await library.randomInteger(0, clients.length)
        console.log(randomNumber);
        console.log(clients[randomNumber]);
        return clients[randomNumber];
    }

}

export { Clients };
