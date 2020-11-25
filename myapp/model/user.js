const connection = require('./db');

module.exports = {
  createUser: function (body, callback) {
    connection.query(
      `INSERT INTO user SET name = '${body.name}', email = '${body.email}', password = '${body.password}'`,
      callback
    );
  },
  findOne: (email, name, callback) => {
    connection.query(
      `select * from user where email = '${email}' and name = '${name}'`,
      callback
    );
  },
  findUser: (email, password, callback) => {
    connection.query(
      `select * from user where email = '${email}' and password = '${password}'`,
      callback
    );
  },
};
