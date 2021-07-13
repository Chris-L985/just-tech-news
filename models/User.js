const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create user model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        id: {
            // use the special sequelize datatypes
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false, 
            // instruct that this is the primary key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values int his table
            unique: true,
            // if allowNull is set to false, we can run our data through validator
            validate: {
                isEmail: true
            }
        },
        // define password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // length of the password is 4
                len: [4]
            }
        }

    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // make it so our model name stays lowerrcase
        modelName: 'user'
    }
);

module.exports = User;