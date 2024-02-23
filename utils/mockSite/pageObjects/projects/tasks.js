import { expect } from '@playwright/test';

class Tasks {
    constructor(page) {
        //Specific project page elements
        this.page = page;
        this.pageHeader = page.locator("h1.title");
        this.editProjectButton = page.getByText("Edit Project");
        this.newHeader = page.locator("//p[text() = 'New']");
        this.inProgressHeader = page.locator("//p[text() = 'InProgress']");
        this.issuesFoundHeader = page.locator("//p[text() = 'IssuesFound']");
        this.completedHeader = page.locator("//p[text() = 'Completed']");
        //Add new task elements
        this.addNewTask = page.getByRole('button', { name: 'Add New Task' });
        this.taskTitle = page.getByPlaceholder('Title');
        const Title = Math.random().toString(36).substring(2, 7);
        this.newTitle = Title;
        //Dropdown icon in task and it's options
        this.dropdownIcon = page.locator("span.icon>i[class = 'fa fa-angle-down']").last();
        this.editTaskOption = page.locator("i.fa.fa-edit");
        this.deleteOption = page.locator("i.fa.fa-trash");
        //Common popup elements
        this.okButton = page.getByRole('button', { name: ' OK' });
        this.cancelButton = page.getByText("Cancel");
        //Delete popup elements
        this.crossIcon = page.locator("header.modal-card-head>button.delete");
        this.deleteTaskHeader = page.locator("p.modal-card-title");
        this.deleteNotification = page.locator("div.notification.is-danger");
        //Elements for drag and drop
        this.drsagFrom = page.locator("div.board-item.draggable").last();
        this.alltasksStatus = page.locator('#sectioncontainer');
        this.inProgressTasks = page.locator("article.message.is-link>div.message-body");
        this.issuesFoundTasks = page.locator("article.message.is-warning>div.message-body");
        this.completeTasks = page.locator("article.message.is-success>div.message-body");
        //Visibility elements in edit task
        this.editTaskHeader = page.locator("p.modal-card-title");
        this.generalTab = page.locator("div.tabs.is-boxed>ul>li.is-active");
        this.estimationTab = page.getByText("Estimation");
        this.editTitle = page.getByText("Title");
        this.description = page.getByText("Description");
        this.notes = page.getByText("Notes");
        //Elements to fill in edit task
        this.titleLocation = page.locator("div.board-item.draggable>div>p")
        this.editedTitle = "Test_edited"
        this.descriptionField = page.getByPlaceholder("Description");
        this.notesField = page.getByPlaceholder("Notes");
        this.startDate = page.getByPlaceholder("Start Date");
        this.dueDate = page.getByPlaceholder("Due Date");
        this.hours = page.getByPlaceholder('Hours');
    }

    async createNewTask() {
        expect(this.page.url()).toContain(process.env.BASEURL + 'projects');
        await expect(this.pageHeader).toContainText("Test");
        await this.addNewTask.click();
        await this.taskTitle.fill(this.newTitle);
        await this.page.keyboard.press('Enter');
        return (this.newTitle);
    }

    async dragToDestination() {
        await this.dragFrom.dragTo(this.inProgressTasks);
    }

    async editTask() {
        await this.dropdownIcon.click();
        await this.editTaskOption.click();
    }

    async fillDetailsInEditTask() {
        await this.taskTitle.fill(this.editedTitle);
        await this.descriptionField.fill("Testing Description");
        await this.notesField.fill("Testing Notes");
        await this.estimationTab.click();
        await this.startDate.fill('2024-02-23');
        await this.dueDate.fill('2024-02-29');
        await this.hours.fill('5');
        await this.okButton.click();
    }

    async deleteTask() {
        await this.dropdownIcon.click();
        await this.deleteOption.click();
    }

    async okButtonIndelete() {
        await this.okButton.click();
    }
}

export { Tasks };