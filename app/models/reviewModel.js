const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../../config/db");

const Reviews = sequelize.define("reviews", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    kostId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Reviews