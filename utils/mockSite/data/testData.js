import { faker } from '@faker-js/faker';

let testData = {

    projectDetails: () => {
        let inputData = {
            projectDetails: {
                projectName: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                notes: faker.lorem.sentence()
            }
        }
        return inputData;
    },
    updateProjectDetails: () => {
        let inputData = {
            updateProjectDetails: {
                projectName: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                notes: faker.lorem.sentence()
            }
        }
        return inputData;
    },
    createActivityDetails: () => {
        let activity = {
            billable: faker.number.int({ min: 1000, max: 5000 }).toString(),
            nonBillable: faker.number.int({ min: 1000, max: 5000 }).toString(),
            doubleRate: faker.number.int({ min: 100, max: 500 }).toString(),
            description: faker.lorem.sentence(),
            notes: faker.lorem.sentence(),
        };
        return activity;
    }
}

export { testData };
