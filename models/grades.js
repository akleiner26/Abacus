
// Creating our Grade model

//This hard coded model will hopefully be replaced by a smaller model that we can add columns too depending on the assignments table.
module.exports = function(sequelize, DataTypes) {
    var Grade = sequelize.define("Grade", {
      studentId: {
        type: DataTypes.INTEGER
      },
      assignment_1: {
        type: DataTypes.INTEGER
      },
      assignment_2: {
        type: DataTypes.INTEGER
      },
      assignment_3: {
        type: DataTypes.INTEGER
      },
      assignment_4: {
        type: DataTypes.INTEGER
      },
      assignment_5: {
        type: DataTypes.INTEGER
      },
      assignment_6: {
        type: DataTypes.INTEGER
      },
      assignment_7: {
        type: DataTypes.INTEGER
      },
      assignment_8: {
        type: DataTypes.INTEGER
      },
      assignment_9: {
        type: DataTypes.INTEGER
      },
      assignment_10: {
        type: DataTypes.INTEGER
      },
      assignment_11: {
        type: DataTypes.INTEGER
      },
      assignment_12: {
        type: DataTypes.INTEGER
      },
      assignment_13: {
        type: DataTypes.INTEGER
      },
      assignment_14: {
        type: DataTypes.INTEGER
      },
      assignment_15: {
        type: DataTypes.INTEGER
      }

    });
    return Grade;
  };
  