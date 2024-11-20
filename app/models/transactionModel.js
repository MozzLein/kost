const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../../config/db')

const Transactions = sequelize.define("transactions", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    bookingId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate:{
            notEmpty : true
        }
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
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true 
        }
    },
    totalAmmount: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    proof: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    }
})

module.exports = Transactions