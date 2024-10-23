const Users = require("../../models/usersModel");

exports.getUserProfileSchema = {
    userId : {
        notEmpty: {
            errorMessage: "Id is required"
        },
        isUUID: true,
        custom: {
            options: async (value) => {
                const user = await Users.findOne({ where: { id: value } })
                if (!user) {
                    throw new Error("User not found");
                }
                return true;
            }
        }
    }
}

exports.editUserProfileSchema = {
    userId: {
        notEmpty: {
            errorMessage: "Id is required"
        },
        isUUID: true
    },
    name: {
        optional: { options: { nullable: true } },
        isString: true,
        isLength: {
            options: { min: 3, max: 20},
            errorMessage: "Name must be at least 3-20 characters long"
        },

    },
    email: {
        optional: { options: { nullable: true } },
        isEmail: {
            errorMessage: "Email must be valid"
        },
        isString: true,
        custom: {
            options: async (value) => {
                const email = await Users.findOne({ where: { email: value } })
                if (email) {
                    throw new Error("Email already used");
                }
            }
        },
    },
    phoneNumber: {
        optional: { options: { nullable: true } },
        isMobilePhone: {
            errorMessage: "Phone Number must be valid"
        },
        isString: true,
    },
    profile_picture: {
        optional: { options: { nullable: true } },
        isString: true,
    }
}

exports.deleteUserSchema = {
    userId: {
        notEmpty: {
            errorMessage: "Id is required"
        },
        isUUID: true
    }
}