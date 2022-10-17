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
      {
        spotId: 6,
        userId: 3,
        review: "Old arena, no wonder the Lakers don't play here anymore. ",
        stars: 2
      },
      {
        spotId: 6,
        userId: 4,
        review: "Okay arena, nothing special, needs renovations",
        stars: 3
      },
      {
        spotId: 7,
        userId: 1,
        review: "Beautiful arena, very modern, great city.",
        stars: 5
      },
      {
        spotId: 7,
        userId: 3,
        review: "No complaints. Standard Arena",
        stars: 4
      },
      {
        spotId: 8,
        userId: 1,
        review: "Warriors moved out of this arena for a reason",
        stars: 2
      },
      {
        spotId: 8,
        userId: 2,
        review: "I have one amazing memory at this arena, winning the NBA finals but happy to never have to come back here again. ",
        stars: 3
      },
      {
        spotId: 9,
        userId: 3,
        review: "No complaints. Standard Football stadium. Very Cold during football season.",
        stars: 4
      },
      {
        spotId: 9,
        userId: 5,
        review: "Great stadium to play for, the fans are amazing.",
        stars: 5
      },
      {
        spotId: 10,
        userId: 4,
        review: "No complaints. Standard Football stadium",
        stars: 3
      },
      {
        spotId: 10,
        userId: 2,
        review: "Spacious arena, always enjoy a football game here",
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
