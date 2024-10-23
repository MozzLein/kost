const bcrypt = require('bcrypt')
const Users = require('../../models/usersModel.js');

exports.userRegistrationSchema = {
    name: {
        notEmpty: {
            errorMessage: "Name is required"
        },
        isString: true,
        isLength: {
            options: { min: 3, max: 20},
            errorMessage: "Name must be at least 3-20 characters long"
        }
    },
    username: {
        notEmpty: {
            errorMessage: "Username is required"
        },
        isString: true,
        isLength: {
            options: { min: 3, max: 16},
            errorMessage: "Username must be at least 3-20 characters long"
        },
        custom: {
            //check if username already exists
            options: async (value) => {
                const user = await Users.findOne({ where: { username: value } })
                if (user) {
                    throw new Error("Username already exists");
                }
                return true;
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required"
        },
        isString: true,
        isLength: {
            options:  {min: 6},
            errorMessage: "Password must be at least 6 characters long"
        }
    },
    confirmPassword: {
        notEmpty: {
            errorMessage: "Confirm Password is required"
        },
        isString: true,
        isLength: {
            options:  {min: 6},
            errorMessage: "Confirm Password must be at least 6 characters long"
        },
        custom: {
            //check if password and confirm password match
            options: (value, {req}) => {
                if(value !== req.body.password) {
                    throw new Error("Password doesn't match")
                }
                return true
            }
        }
    },
    email: {
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "Email must be valid"
        },
        custom: {
            //check if email already exists
            options: async (value) => {
                const user = await Users.findOne({ where: { email: value } })
                if (user) {
                    throw new Error("Email already exists");
                }
                return true;
        }
        }
    },
    phoneNumber: {
        notEmpty: {
            errorMessage: "Phone Number is required"
        },
        isMobilePhone: {
            errorMessage: "Phone Number must be valid"
        },
        isString: true
    }
}

exports.userLoginSchema = {
    username: {
        notEmpty: {
            errorMessage: "Username is required"
        },
        isString: true,
        custom: {
            //check if username already exists
            options: async (value) => {
                const user = await Users.findOne({ where: { username: value } })
                if (!user) {
                    throw new Error("Wrong username or password");
                }
                return true;
            }
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required"
        },
        isString: true,
        custom: {
            //check if inputed password and password in database is match
            options: async (value, {req}) => {
                const user = await Users.findOne({ where: { username: req.body.username } })
                if (!user) {
                    throw new Error("Wrong username or password");
                }

                const passwordMatch = await bcrypt.compare(value, user.password)
                if (!passwordMatch) {
                    throw new Error("Wrong username or password");
                }
                return true;
            }
        }
    }
}

