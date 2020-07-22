'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
//fetch base directory name(?)
var basename  = path.basename(module.filename);
//env variable use production/heroku or local development from config.json. Env on line 17 
var env       = process.env.NODE_ENV || 'development';
//pulls json
var config    = require(__dirname + '/../config/config.js')[env];
var db        = {};

//use_env_variable would be in config env as a boolean to help with a password (?)
//else it uses local information
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//read all files labeled js in directory, import into sequelize and attach (return?) to db[model.name]
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

//associate with db if there are any
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//attach to sequelize, so Todo.js/other model doesnt need require because we are given access here.

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
//pushes everything in the file into a json object.
