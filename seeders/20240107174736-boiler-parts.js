const { faker } = require('@faker-js/faker');

('use strict');

const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
];
const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
];

const randomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fakerImage = () =>
  JSON.stringify(
    [...Array(7)].map(() =>
      faker.image.urlLoremFlickr({ category: 'technics' }),
    ),
  );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'BoilerParts',
      [...Array(100)].map(() => ({
        boiler_manufacturer: randomValue(boilerManufacturers),
        parts_manufacturer: randomValue(partsManufacturers),
        price: faker.string.numeric(4),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
        images: fakerImage(),
        vendor_code: faker.internet.password(),
        in_stock: faker.string.numeric(1),
        bestsellers: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.string.numeric(3),
        compatibillity: faker.lorem.sentence(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BoilerParts', null, {});
  },
};
