import { expect } from "playwright/test";
import { library } from "../../library/library";
import { Clients } from "../clients/clients";
import { NavigationMenu } from "../navigationMenu";
import { projects } from '../../constants.json';

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
        this.createdColumnHeader = page.locator('table>thead>tr>th:nth-child(4)');
        this.projectNameCell = page.locator('tbody>tr>td:nth-child(2)');

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

        //delete project
        this.createdColumnHeader = page.getByText('Created');
        this.deleteButton = page.getByText('Delete Project');
        this.deleteProjectHeader = page.getByRole('banner');
        this.closeBtn = page.getByRole('banner').getByLabel('close');
        this.confirmationMsg = page.locator('div.notification');
        this.deleteOkButton = page.getByRole('button', { name: ' OK' });
        this.deleteCancelButton = page.getByRole('contentinfo').getByLabel('close');
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

        await this.descriptionField.fill(description);
    }

    async fillNotesField(notes) {

        await this.notesField.fill(notes);
    }

    async validateProjectsPage(page) {

        await expect.soft(this.header).toBeVisible();
        await expect.soft(this.header).toHaveText(projects.header);
        await expect.soft(this.addNewProjectButton).toBeVisible();
        await expect.soft(this.fastBackwardButton).toBeVisible();
        await expect.soft(this.stepBackwardButton).toBeVisible();
        await expect.soft(this.fastForwardButton).toBeVisible();
        await expect.soft(this.stepForwardButton).toBeVisible();
        await expect.soft(this.table).toBeVisible();
    }

    async validateAddNewProjectModal(page) {

        await expect.soft(this.closeButton).toBeVisible();
        await expect.soft(this.nameField).toBeVisible();
        await expect.soft(this.clientField).toBeVisible();
        await expect.soft(this.stageDropdown).toBeVisible();
        await expect.soft(this.descriptionField).toBeVisible();
        await expect.soft(this.notesField).toBeVisible();
    }

    async addNewProject(page, projectDetails) {

        const navigationMenu = new NavigationMenu(page);
        const clientPage = new Clients(page);
        await navigationMenu.navigateToClients(page);

        const clientName = await clientPage.getARandomClient(page);
        console.log(clientName);

        await navigationMenu.navigateToProjects(page);
        await this.addNewProjectButton.click();
        await this.fillNameField(projectDetails.projectName);
        await this.fillClientField(clientName);
        await this.clientDropdownMenu.click();
        await this.fillDescriptionField(projectDetails.description);
        await this.fillNotesField(projectDetails.notes);
        await this.okButton.click();
    }

    async sortClientsByDesc() {
        await this.createdColumnHeader.click();
        await this.createdColumnHeader.click();
    }

    async updateProject(projectName, projectDetails) {

        await this.sortClientsByDesc(page);
        await this.projectNameCell.filter({ hasText: projectName }).click();

        await this.addNewProjectButton.click();
        await this.fillNameField(projectDetails.projectName);
        await this.fillDescriptionField(projectDetails.description);
        await this.fillNotesField(projectDetails.notes);
        await this.okButton.click();
    }

    async viewDeleteProjectModal(projectName) {

        await library.waitForLocatorVisiblity(this.createdColumnHeader);
        await this.createdColumnHeader.click();
        await this.createdColumnHeader.click();

        const selectionIcon = this.page.locator(`//a[text() = '${projectName}']/parent::td/following-sibling::td//span/i`);
        await selectionIcon.click();
        await this.deleteButton.click();
    }

    async validateDeleteProjectModal(projectName) {

        await expect(this.deleteProjectHeader, "Validating the delete project page header").toHaveText(projects.deleteProjectHeader);
        await expect(this.closeBtn, "Validating the close button visibility").toBeVisible();
        const actualMsg = projects.deleteProjectConfirmationMessage + projectName + "?";
        await expect(this.confirmationMsg, "Validating the message displayed in delete project page").toHaveText(actualMsg);
        await expect(this.deleteOkButton, "Validating the ok button visibility").toBeVisible();
        await expect(this.deleteCancelButton, "Validating the close button visibility").toBeVisible();
    }

    async deleteProject(projectName) {

        await this.viewDeleteProjectModal(projectName);
        await this.deleteOkButton.click();
    }

    async validateDeletedProject(projectName) {

        const project = this.page.locator("//a[text()= '" + projectName + "']");
        await expect(project, "Validating that the project is deleted").toBeHidden()
    }
}

export { Projects };
