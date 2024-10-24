const Kosts = require("../../models/kostModel")
const Users = require("../../models/usersModel")

exports.addReviewSchema = {
    kostId: {
        notEmpty: {
            errorMessage: "Kost id is required"
        },
        isUUID: {
            errorMessage: "Kost id must be a UUID"
        },
        custom: {
            options: async (kostId) => {
                const kost = await Kosts.findOne({where : {id : kostId}})
                if(!kost) throw new Error("Kost not found")
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
            options: async (userId) => {
                const user = await Users.findOne({where : {id : userId}})
                if(!user) throw new Error("User not found")
            }
        }
    },
    rating: {
        notEmpty: {
            errorMessage: "Rating is required"
        },
        isFloat: {
            errorMessage: "Rating must be a float"
        },
        isLength: {
            options: {min: 0, max: 5},
            errorMessage: "Rating must be between 0 and 5"
        }
    },
    comment: {
        isString: {
            errorMessage: "Comment must be a string"
        }
    }
}

exports.getReviewSchema = {
    kostId: {
        notEmpty: {
            errorMessage: "Review id is required"
        },
        isUUID: {
            errorMessage: "Review id must be a UUID"
        }
    }
}