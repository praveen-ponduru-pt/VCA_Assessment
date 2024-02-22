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

    }
}

export { Projects };
