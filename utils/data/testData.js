import { faker } from '@faker-js/faker';

let testData = {
    createCoverageDetails: () => {
        let coverage = {
            projectName: faker.commerce.productName(),
            description: faker.faker.lorem.sentence(),
            notes: faker.lorem.sentence()
        };
        return coverage;
    }
}

export { testData };
