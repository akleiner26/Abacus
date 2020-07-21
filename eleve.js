

var Grade = require("./grades")

//This hard coded model will hopefully be replaced by a smaller model that we can add columns too depending on the assignments table.
module.exports = function(sequelize, DataTypes) {
    // This is a work around to create composite primary key.
    Eleve = sequelize.define('Eleve', {});
    
    Eleve.associate = function(models) {
        Eleve.belongsToMany(models.Assign, { through: Grade });
    }
        
    
      return Eleve;
    };
    