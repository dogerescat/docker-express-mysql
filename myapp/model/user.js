const connection = require('./db');

module.exports = {
  createUser: (body, callback) => {
    connection.query(
      `INSERT INTO user SET name = '${body.name}', email = '${body.email}', password = '${body.password}'`,
      callback
    );
  },
  findOne: (email, name, password, callback) => {
    connection.query(
      `select * from user where email = '${email}' and name = '${name}' and password = '${password}'`,
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
