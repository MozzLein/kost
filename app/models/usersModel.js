const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../../config/db')

const Users = sequelize.define("users", {
    id:{
        type: DataTypes.UUID, 
        defaultValue: Sequelize.UUIDV4, 
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
    }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
    }
    },
    phoneNumber:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty : true
        }
    },
    profile_picture:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    kostRelationId:{
        type: DataTypes.UUID, 
        allowNull: true,
    },
    bankName:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    bankAccountName:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    bankAccountNumber:{
        type: DataTypes.STRING,
        allowNull: true,
    }
})

module.exports = Users