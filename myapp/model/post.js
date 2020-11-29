const connection = require('./db');

module.exports = {
  create: (body, uid, callback) => {
    connection.query(
      `INSERT INTO post SET title = '${body.title}', contents = '${body.contents}', user_id = '${uid}'`,
      callback
    );
  },
  get: (callback) => {
      connection.query(
          `select * from post`, callback
      )
  },
  toEdit: (id, callback) => {
    connection.query(`select * from post where id = '${id}'`, callback);
  },
  update: (req, callback) => {
    connection.query(`update post set title = ?, contents = ? where id = ?`, [req.body.title, req.body.contents, req.params.id], callback);
  }
};
