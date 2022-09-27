'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ReviewImages", [
      {
        reviewId: 1,
        url: "orange.com",
      },
      {
        reviewId: 2,
        url: "blue.com",
      },
      {
        reviewId: 3,
        url: "grey.com",
      },
      {
        reviewId: 4,
        url: "purple.com",
      },
      {
        reviewId: 5,
        url: "violet.com",
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
