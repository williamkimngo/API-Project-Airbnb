'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: "Great Stadium, would come again for another event!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "Horrible Parking, staff was friendly but I would avoid going to an event in DTLA unless you like stress",
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: "Staff very friendly, comfortable seating, parking not too bad.",
        stars: 5
      },
      {
        spotId: 2,
        userId: 4,
        review: "I spent half the event in the restroom, most likely due to poor quality of food. Don't recommend.",
        stars: 1
      },
      {
        spotId: 3,
        userId: 4,
        review: "Beautiful stadium. Very modern, any event at this stadium would be amazing!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 5,
        review: "Stadium near public transit, would recommend to take public transit due to limited/expensive parking. Otherwise, restaurants at the stadium are overpriced as expected for SF. ",
        stars: 4
      },
      {
        spotId: 4,
        userId: 5,
        review: "Unfortunately, went to the stadium when it was raining, which was unexpected. Luckily, they provided ponchos during the event.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 1,
        review: "Typical football stadium. Nothing great about it.",
        stars: 3
      },
      {
        spotId: 5,
        userId: 1,
        review: "Great crowd, great stadium, food was great.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 2,
        review: "No complaints. Standard Football stadium",
        stars: 4
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
