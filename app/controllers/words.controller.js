var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Word = mongoose.model('Word');

module.exports = function (app) {
  app.use('/words', router);
};

router.get('/:id', function (req, res, next) {
  Word.findOne({_id: req.params.id}, function (err, word) {
    console.log("Fetching details for word with id: " + req.params.id + word);
    if (err) return next(err);
    res.send(200, word);
  });
});
