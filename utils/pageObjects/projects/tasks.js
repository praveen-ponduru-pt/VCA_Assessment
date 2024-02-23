import { expect } from '@playwright/test';

class Tasks {
    constructor(page) {
        this.page = page;
        this.ellipsisButton = page.getByText('Test').first();
        this.addNewTask = page.getByRole('button', { name: 'Add New Task' });
        this.pageHeader = page.locator("h1.title");
        this.taskTitle = page.getByPlaceholder('Title');
        this.newTitle = Math.random().toString(36).substring(2, 7);
    }
    async createNewTask() {
```````````
        await this.ellipsisButton.click();
        expect(this.page.url()).toContain(process.env.BASEURL + 'projects');
        await expect(this.pageHeader).toContainText("Test");
        await this.addNewTask.click();```````````
        await this.taskTitle.fill(this.newTitle);
        await this.page.keyboard.press('Enter');
    }
}

export { Tasks };
