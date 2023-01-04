'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 1,
        url: "https://i.imgur.com/hEvsJvp.png",
        preview: true
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/UyQNCi9.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/c2X1Ecd.png",
        preview: true
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/C0EHDNJ.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/chIxjYd.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/iH1M6AG.png",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.imgur.com/RRtoFVe.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://i.imgur.com/FAU1S9x.png",
        preview: true
      },
      {
        spotId: 5,
        url:"https://i.imgur.com/WskGlc6.png",
        preview: true
      },
      {
        spotId: 6,
        url:"https://i.imgur.com/HfNOswA.png",
        preview: true
      },
      {
        spotId: 7,
        url:"https://i.imgur.com/PIPURcI.png",
        preview: true
      },
      {
        spotId: 8,
        url:"https://i.imgur.com/oNHBwTb.png",
        preview: true
      },
      {
        spotId: 9,
        url:"https://i.imgur.com/yaCVbKn.png",
        preview: true
      },
      {
        spotId: 10,
        url:"https://i.imgur.com/dvtTSuj.jpg",
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
