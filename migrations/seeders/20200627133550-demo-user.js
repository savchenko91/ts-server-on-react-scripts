'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      username: 'John',
      vkId: '2949',
      password: 'sdfsdfasdfasdfasf',
      email: 'example@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
