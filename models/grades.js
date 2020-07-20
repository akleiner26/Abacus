
// Creating our Assignment model
module.exports = function(sequelize, DataTypes) {
    var Grade = sequelize.define("Grade", {
    
      student: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      assignment1Grade: {
        type: DataTypes.STRING,
      },
    
      assignment2Grade: {
        type: DataTypes.STRING,
      },
      
      assignment3Grade: {
        type: DataTypes.STRING,
      },
  
    });
    return Grade;
  };
  