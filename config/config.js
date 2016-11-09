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
    db: 'mongodb://nodeHero:ggamji@ds050559.mlab.com:50559/ggamji'
  },

  production: {
    root: rootPath,
    app: {
      name: 'ggamji'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://nodeHero:ggamji@ds050559.mlab.com:50559/ggamji'
  }
};

module.exports = config[env];
