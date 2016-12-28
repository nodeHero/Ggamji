var express = require('express'),
  router = express.Router();

// Mandalart About page.
module.exports = function (app) {
  app.use('/ggamji', router);
};

router.get('/', function (req, res, next) {
  res.render('ggamji', {
    title: 'ggamji'
  });
});
