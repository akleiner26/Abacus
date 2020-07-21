

var Grade = require("./grades")

//This hard coded model will hopefully be replaced by a smaller model that we can add columns too depending on the assignments table.
module.exports = function(sequelize, DataTypes) {
    // This is a work around to create composite primary key.
    Assign = sequelize.define('Assign', {});
    
    Assign.associate = function(models) {
        Assign.belongsToMany(models.Eleve, { through: Grade });
    }
        
    
      return Assign;
    };
    