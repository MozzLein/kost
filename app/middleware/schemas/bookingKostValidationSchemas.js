const Kosts = require("../../models/kostModel")
const Users = require("../../models/usersModel")

exports.userBookingKostSchema = {    
    kostId: {
        notEmpty: {
            errorMessage: "Kost id is required"
        },
        isUUID: {
            errorMessage: "Kost id must be a UUID"
        },
        custom: {
            options: async (value) => {
                const kost = await Kosts.findOne({where: {id: value}})
                if(!kost) throw new Error("Kost not found")
                return true
            }
        }   
    },
    userId: {
        notEmpty: {
            errorMessage: "User id is required"
        },
        isUUID: {
            errorMessage: "User id must be a UUID"
        },
        custom: {
            options: async (value) => {
                const user = await Users.findOne({where: {id: value}})
                if(!user) throw new Error("User not found")
                return true
            }
        }   
    },
    bookingTime: {
        notEmpty: {
            errorMessage: "Booking time is required"
        }
    }
}

exports.getUserBookingKostSchema = {
    userId: {
        notEmpty: {
            errorMessage: "User id is required"
        },
        isUUID: {
            errorMessage: "User id must be a UUID"
        },
        custom: {
            options: async (value) => {
                const user = await Users.findOne({where: {id: value}})
                if(!user) throw new Error("User not found")
                return true
            }
        }   
    }
}