const connection = require('./db');
  
module.exports = {
    create: (uid, pid, callback) => {
        connection.query(`insert into likes set user_id = '${uid}', post_id = '${pid}'`,callback)
    },
    getCounter: (callback) => {
        connection.query(`select post_id ,count(post_id) from likes group by post_id`, callback);
    },
    delete: (uid, pid, callback) => {
        connection.query(`delete from likes where user_id = '${uid}' and post_id = '${pid}'`, callback);
    },
    getAll: (callback) => {
        connection.query(`select * from likes`, callback);
    },
    deletePostId: (id, callback) => {
        connection.query(`delete from likes where post_id = '${id}'`, callback);
    }
}