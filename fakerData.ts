// ESM
import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    fullName: faker.internet.userName(),
    phone: faker.phone.number(),
    address : faker.location.streetAddress(),
    city : faker.location.city(),
    country : faker.location.country()
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5,
})