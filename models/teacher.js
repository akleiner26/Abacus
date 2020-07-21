// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define("Teacher", {
    // The email cannot be null, and must be a proper email before creation
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

  Teacher.associate = function(models) {
    Teacher.hasMany(models.Student)
  };

  // User.associate = function(model) {
  //   User.belongsTo(model.User, {
  //     foreignKey: {
        
  //     }
  //   })
  // };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Teacher.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Teacher.addHook("beforeCreate", function(teacher) {
    teacher.password = bcrypt.hashSync(teacher.password, bcrypt.genSaltSync(10), null);
  });
  return Teacher;
};
