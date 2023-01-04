'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Kobe',
        lastName: "Bryant",
        hashedPassword: bcrypt.hashSync('password'),
        profile_url: "https://i.imgur.com/HG7RLd9.png"

      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: "Lebron",
        lastName: "James",
        hashedPassword: bcrypt.hashSync('password2'),
        profile_url: "https://i.imgur.com/fjpZVyf.jpg"
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: "Steph",
        lastName: "Curry",
        hashedPassword: bcrypt.hashSync('password3'),
        profile_url: "https://i.imgur.com/fBxjSTA.jpg"
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: "Tom",
        lastName: "Brady",
        hashedPassword: bcrypt.hashSync('password3'),
        profile_url: "https://i.imgur.com/aA206ly.png"
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: "Jalen",
        lastName: "Hurts",
        hashedPassword: bcrypt.hashSync("password4"),
        profile_url: "https://i.imgur.com/CYgjFlM.png"
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4'] }
    }, {});
  }
};
