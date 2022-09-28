'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 1,
        url: "brown.com",
        preview: true
      },
      {
        spotId: 2,
        url: "maroon.com",
        preview: false
      },
      {
        spotId: 3,
        url: "gold.com",
        preview: true
      },
      {
        spotId: 4,
        url: "teal.com",
        preview: true
      },
      {
        spotId: 5,
        url:"yellow.com",
        preview: true
      },
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
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
