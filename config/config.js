var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'ggamji'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost:27017/ggamji'
    // db: 'mongodb://localhost/ggamji-dev'
  },

  production: {
    root: rootPath,
    app: {
      name: 'ggamji'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/ggamji'
  }
};

module.exports = config[env];
