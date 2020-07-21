
// Creating our Grade model


//This hard coded model will hopefully be replaced by a smaller model that we can add columns too depending on the assignments table.
module.exports = function(sequelize, DataTypes) {
  // This is a work around to create composite primary key.
  
  Grade = sequelize.define('Grade', {
      gradeVal: DataTypes.INTEGER

  });
  
  
  
  
  
    return Grade;
  };
  