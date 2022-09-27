'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Bookings", [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('December 12, 2022'),
        endDate: new Date('December 14, 2022')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('December 20, 2022'),
        endDate: new Date('December 22, 2022')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('December 16, 2022'),
        endDate: new Date('December 18, 2022')
      },
      {
        spotId: 4,
        userId: 4,
        startDate: new Date('December 23, 2022'),
        endDate: new Date('December 26, 2022')
      },
      {
        spotId: 5,
        userId: 5,
        startDate: new Date('December 27, 2022'),
        endDate: new Date('December 30, 2022')
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
