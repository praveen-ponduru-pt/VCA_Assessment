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
    }
}

export { testData };
