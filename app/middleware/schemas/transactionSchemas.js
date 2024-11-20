const Bookings = require("../../models/bookingKostModel")
const Kosts = require("../../models/kostModel")
const Users = require("../../models/usersModel")

exports.userMakeTransactionSchema = {
    bookingId: {
        notEmpty: {
            errorMessage: "Booking id is required"
        },
        isUUID: {
            errorMessage: "Booking id must be a UUID"
        },
        custom: {
            options: async (value, { req }) => {
                const booking = await Bookings.findOne({
                    where: {
                        id: value
                    }
                })
                if (!booking) {
                    throw new Error("Booking not found")
                }
                return true
            }
        },
    },
    userId: {
        notEmpty: {
            errorMessage: "User id is required"
        },
        isUUID: {
            errorMessage: "User id must be a UUID"
        },
        custom: {
            options: async (value, { req }) => {
                const user = await Users.findOne({
                    where: {
                        id: value
                    }
                })
                if (!user) {
                    throw new Error("User not found")
                }
                return true
            }
        },
    },
    kostId: {
        notEmpty: {
            errorMessage: "Kost id is required"
        },
        isUUID: {
            errorMessage: "Kost id must be a UUID"
        },
        custom: {
            options: async (value, { req }) => {
                const kost = await Kosts.findOne({
                    where: {
                        id: value
                    }
                })
                if (!kost) {
                    throw new Error("Kost not found")
                }
                return true
            }
        },
    },
    proof: {
        notEmpty: {
            errorMessage: "Proof is required"
        },
        isString: true
    }
}