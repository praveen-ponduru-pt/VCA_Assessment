import { expect } from "playwright/test";
import { library } from "../../library/library";

class Projects {
    constructor(page) {
        this.page = page;
        this.header = page.getByRole('heading', { name: ' Projects Add New Project' });
        this.addNewProjectButton = page.locator('div.container>h1>button');
        this.fastBackwardButton = page.locator('div.buttons>button>span>span>i.fa-fast-backward');
        this.stepBackwardButton = page.locator('div.buttons>button>span>span>i.fa-step-backward');
        this.fastForwardButton = page.locator('div.buttons>button>span>span>i.fa-fast-forward');
        this.stepForwardButton = page.locator('div.buttons>button>span>span>i.fa-step-forward');
        this.table = page.locator('table');

        this.addProjectModal = page.locator('div.modal>div.modal-card');
        this.addProjectHeader = page.locator('div.modal>div>header>p');

        this.closeButton = page.getByPlaceholder('div.modal>div>header>button.delete');
        this.nameField = page.getByPlaceholder('Name');
        this.clientField = page.getByPlaceholder('Client');
        this.clientDropdownMenu = page.locator('div.modal-card>section>form>div:nth-child(3)>div>div');
        this.stageDropdown = page.getByRole('combobox');
        this.descriptionField = page.getByPlaceholder('Description');
        this.notesField = page.getByPlaceholder('Notes');
        const dropdownValues = ['Select Stage', 'New', 'InProgess', 'Completed', 'IssuesFound', 'Deployed', 'Closed'];

        this.okButton = page.locator('div.modal-card>footer>button.is-success');
        this.cancelButton = page.locator('div.modal-card>footer>button').filter({ name: 'Cancel' });
    }

    async waitUntilProjectsPageIsLoaded() {

        await library.waitForLocatorVisiblity(this.header);
    }

    async verifyStageDropdownValues(page) {

        const dropdown = await page.waitForSelector('select');

        // Extract all the options from the dropdown
        const options = await dropdown.evaluate(dropdown => {

            const options = [];
            for (const option of dropdown.options) {
                options.push(option.textContent.trim());
            }
        });
        expect(options).toEqual(dropdownValues);

    }

    async fillNameField(projectName) {

        await this.nameField.fill(projectName);
    }

    async fillClientField(clientName) {

        await this.clientField.fill(clientName);
    }

    async fillDescriptionField(description) {

        await this.page.descriptionField.fill(description);
    }

    async fillNotesField(notes) {

        await this.page.notesField.fill(notes);
    }

    async addNewProject() {

        await this.addNewProjectButton.click()
        await this.fillNameField('Test');
        await this.fillClientField('Hamill LLC');
        await this.clientDropdownMenu.click();
        await this.okButton.click();
    }

}

export { Projects };
