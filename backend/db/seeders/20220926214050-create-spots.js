'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "1111 S Figueroa St",
        city: "Los Angeles",
        state: "California",
        country: "United States",
        lat: 34.04,
        lng: 118.26,
        name: "Crypto.com Arena",
        description: "Crypto.com Arena is a multi-purpose arena in Downtown Los Angeles. Adjacent to the L.A. Live development, it is located next to the Los Angeles Convention Center complex along Figueroa Street.",
        price: 2000
      },
      {
        ownerId: 2,
        address: "1 Center Court",
        city: "Cleveland",
        state: "Ohio",
        country: "United States",
        lat: 41.50,
        lng: 81.69,
        name: "Rocket Mortgage FieldHouse",
        description: "Rocket Mortgage FieldHouse is a multi-purpose arena in Cleveland, Ohio. The building is the home of the Cleveland Cavaliers of the National Basketball Association.",
        price: 5000
      },
      {
        ownerId: 3,
        address: "1 Warriors Way",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 37.77,
        lng: 122.39,
        name: "Chase Center",
        description: "Chase Center is an indoor arena in the Mission Bay neighborhood of San Francisco, California. The building is the home venue for the Golden State Warriors of the National Basketball Association.",
        price: 3000
      },
      {
        ownerId: 4,
        address: "4201 N Dale Mabry Hwy",
        city: "Tampa",
        state: "Florida",
        country: "United States",
        lat: 27.97,
        lng: 82.50,
        name: "Raymond James Stadium",
        description: "Raymond James Stadium is a multi-purpose stadium in Tampa, Florida that opened in 1998 and is home to the Tampa Bay Buccaneers of the National Football League",
        price: 1500
      },
      {
        ownerId: 5,
        address: "One Lincoln Financial Field Way",
        city: "Philadelphia",
        state: "Pennsylvania",
        country: "United States",
        lat: 39.90,
        lng: 75.17,
        name: "Lincoln Financial Field",
        description: "Chase Center is an indoor arena in the Mission Bay neighborhood of San Francisco, California. The building is the home venue for the Golden State Warriors of the National Basketball Association.",
        price: 2500
      },
      {
        ownerId: 1,
        address: "3900 W Manchester Blvd",
        city: "Inglewood",
        state: "California",
        country: "United States",
        lat: 33.95,
        lng: 118.34,
        name: "The Kia Forum",
        description: "Kia Forum is a multi-purpose indoor arena in Inglewood, California, United States, adjacent to Los Angeles",
        price: 1500
      },
      {
        ownerId: 2,
        address: "601 Biscayne Blvd",
        city: "Miami",
        state: "Florida",
        country: "United States",
        lat: 25.78,
        lng: 80.18,
        name: "FTX Arena",
        description: "The FTX Arena is a multi-purpose arena located in Miami, Florida, along Biscayne Bay",
        price: 1800
      },
      {
        ownerId: 3,
        address: "7000 S Coliseum Way",
        city: "Oakland",
        state: "California",
        country: "United States",
        lat: 37.75,
        lng: 122.20,
        name: "Oracle Arena",
        description: "Oracle Arena is an indoor arena located in Oakland, California, United States",
        price: 1800
      },
      {
        ownerId: 4,
        address: "1 Patriot Pl",
        city: "Foxborough",
        state: "Massachusetts",
        country: "United States",
        lat: 42.09,
        lng: 71.26,
        name: "Gillette Stadium",
        description: "Gillette Stadium is a multi-purpose stadium located in the town of Foxborough, Massachusetts, which is 22 miles southwest of downtown Boston. It serves as the home stadium for the New England Patriots. ",
        price: 1400
      },
      {
        ownerId: 5,
        address: "1185 Asp Ave",
        city: "Norman",
        state: "Oklahoma",
        country: "United States",
        lat: 35.20,
        lng: 97.44,
        name: "Oklahoma Memorial Stadium",
        description: "Oklahoma Memorial Stadium is the football stadium on the campus of the University of Oklahoma in Norman, Oklahoma. It serves as the home of the Oklahoma Sooners football team. ",
        price: 1100
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5]}
    })
  }
};
