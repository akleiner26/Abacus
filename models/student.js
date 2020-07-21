// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    // The email cannot be null, and must be a proper email before creation
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     isEmail: true
    //   }
    // // },
    // teacher_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
    
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }

  });

//how to assign a reflexive foreign key.

  Student.associate = function(models) {
    Student.hasMany(models.Grade)
  };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  // Student.prototype.validPassword = function(password) {
  //   return bcrypt.compareSync(password, this.password);
  // };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  // Student.addHook("beforeCreate", function(user) {
  //   student.password = bcrypt.hashSync(student.password, bcrypt.genSaltSync(10), null);
  // });
  return Student;
};
