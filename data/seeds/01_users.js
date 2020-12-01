const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username: 'djviodes', first_name: 'David', last_name: 'Viodes', password: bcrypt.hashSync('Passw0rd', 14) },
        { username: 'atolson', first_name: 'Alexa', last_name: 'Olson', password: bcrypt.hashSync('12345', 14) },
      ])
    })
};
