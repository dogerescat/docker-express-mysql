const Like = require('../model/like');

module.exports = {
  create: (req, res) => {
    Like.create(req.decoded.id, req.params.id, (error, result) => {
      if (error) {
        return;
      }
      Like.getCounter((err, getResult) => {
        res.json(getResult);
      });
    });
  },
  delete: (req, res) => {
    Like.delete(req.decoded.id, req.params.id, (error) => {
      if (error) {
        return;
      }
      Like.getCounter((err, getResult) => {
        if (err) {
          return;
        }
        res.json(getResult);
      });
    });
  },
};
