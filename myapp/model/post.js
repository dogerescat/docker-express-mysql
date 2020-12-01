const connection = require('./db');

module.exports = {
  create: (body, uid, callback) => {
    connection.query(
      `INSERT INTO posts SET title = '${body.title}', contents = '${body.contents}', user_id = '${uid}'`,
      callback
    );
  },
  get: (callback) => {
    connection.query(`select * from posts`, callback);
  },
  toEdit: (id, callback) => {
    connection.query(`select * from posts where id = '${id}'`, callback);
  },
  update: (req, callback) => {
    connection.query(
      `update posts set title = ?, contents = ? where id = ?`,
      [req.body.title, req.body.contents, req.params.id],
      callback
    );
  },
  delete: (id, callback) => {
    connection.query(`delete from posts where id = '${id}'`, callback);
  },
};
