
// Creating our Grade model


//This hard coded model will hopefully be replaced by a smaller model that we can add columns too depending on the assignments table.
module.exports = function(sequelize, DataTypes) {
    Assign = sequelize.define('Assign', {});

    Assign.associate = function(models) {
        Assign.belongsToMany(models.Eleve, { through: Grade});
    }    

      return Assign;
    };
    