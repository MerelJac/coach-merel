const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, 
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
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
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    modelName: 'user',
})

module.exports = User;