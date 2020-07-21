


// Creating our Assignment model
module.exports = function(sequelize, DataTypes) {
  var Assignment = sequelize.define("Assignment", {
    // The email cannot be null, and must be a proper email before creation
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    assignment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    subject: {
      type: DataTypes.STRING

    }

  });

  Assignment.associate = function(models) {
    Assignment.hasMany(models.Grade, {
        onDelete: "cascade"
      });
  };

  return Assignment;
};
