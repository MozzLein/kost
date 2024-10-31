const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require("../../config/db")

const Bookings = sequelize.define("bookings", {
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
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    bookingTime: {
        type: DataTypes.STRING,
        allowNull: false,    
        validate:{
            notEmpty : true
        }
    },
    bookingExpireDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    bookingStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true 
        }
    }
})

module.exports = Bookings
