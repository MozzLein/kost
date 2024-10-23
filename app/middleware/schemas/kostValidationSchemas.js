const Kosts = require("../../models/kostModel")
const Users = require("../../models/usersModel")


exports.addKostSchema = {
    adminId: {
        notEmpty: {
            errorMessage: "Admin id is required"
        },
        isUUID: {
            errorMessage: "Admin id must be a UUID"
        },
        custom: {
            options: async (value) => {
                const admin = await Users.findOne({where: {id: value}, attributes: ['role']})
                if(!admin || admin.role !== 'admin') throw new Error("Admin not found")
                return true
            }
        }
    },
    kostName: {
        notEmpty: {
            errorMessage: "Kost name is required"
        },
        isString: true,
    },
    description: {
        isString: true,
        isLength: {
            options: { min: 0, max: 500},
            errorMessage: "Description must be at least 0-500 characters long"
        },
    },
    address: {
        notEmpty: {
            errorMessage: "Kost address is required"
        },
        isString: true
    },
    city: {
        notEmpty: {
            errorMessage: "City is required"
        },
        isString: true
    },
    postalCode: {
        notEmpty: {
            errorMessage: "Postal code is required"
        },
        isString: true
    },
    latitude: {
        notEmpty: {
            errorMessage: "Latitude is required"
        },
        isFloat: true
    },
    longitude: {
        notEmpty: {
            errorMessage: "Longitude is required"
        },
        isFloat: true
    },
    price: {
        notEmpty: {
            errorMessage: "Price is required"
        },
        isFloat: true
    },
    paymentMethods: {
        notEmpty: {
            errorMessage: "Payment method is required"
        },
        isString: true
    },
    roomSize: {
        notEmpty: {
            errorMessage: "Room size is required"
        },
        isString: true
    },
    roomType: {
        notEmpty: {
            errorMessage: "Room type is required"
        },
        isString: true
    },
    totalRooms: {
        notEmpty: {
            errorMessage: "Total rooms is required"
        },
        isString: true
    },
    availability: {
        notEmpty: {
            errorMessage: "Availability is required"
        },
        isString: true
    },
    facilities: {
        notEmpty: {
            errorMessage: "Facilities is required"
        },
        isString: true
    },
    image: {
        notEmpty: {
            errorMessage: "Photos is required"
        },
        isString: true
    },
    video: {
        isString: true
    },
    rating: {
        isFloat: true
    }
}

exports.getAllKostSchema = {
    city: {
        notEmpty: {
            errorMessage: "City is required"
        },
        isString: true
    }
}

exports.getKostSchema = {
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
    }
}

exports.editKostSchema = {
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
    adminId: {
        notEmpty: {
            errorMessage: "Admin id is required"
        },
        isUUID: {
            errorMessage: "Admin id must be a UUID"
        },
        custom: {
            options: async (value) => {
                console.log(value)
                const admin = await Users.findOne({where: {id: value}, attributes: ['role']})
                if(!admin || admin.role !== 'admin') throw new Error("Admin not found")
                return true
            }
        }
    },
    kostName: {
        optional: { options: { nullable: true } },
        isString: true
    },
    description: {
        optional: { options: { nullable: true } },
        isString: true,
        isLength: {
            options: { min: 0, max: 500},
            errorMessage: "Description must be at least 0-500 characters long"
        },
    },
    address: {
        optional: { options: { nullable: true } },
        isString: true
    },
    city: {
        optional: { options: { nullable: true } },
        isString: true
    },
    postalCode: {
        optional: { options: { nullable: true } },  
        isString: true  
    },
    latitude: {
        optional: { options: { nullable: true } },
        isFloat: true   
    },
    longitude: {
        optional: { options: { nullable: true } },
        isFloat: true   
    },
    price: {
        optional: { options: { nullable: true } },
        isFloat: true   
    },    
    paymentMethods: {
        optional: { options: { nullable: true } },
        isString: true
    },
    roomSize: {
        optional: { options: { nullable: true } },
        isString: true
    },
    roomType: {
        optional: { options: { nullable: true } },
        isString: true
    },
    totalRooms: {
        optional: { options: { nullable: true } },
        isString: true
    },
    availability: {
        optional: { options: { nullable: true } },
        isString: true
    },    
    facilities: {
        optional: { options: { nullable: true } },
        isString: true  
    },
    image: {
        optional: { options: { nullable: true } },
        isString: true
    },
    video: {
        optional: { options: { nullable: true } },
        isString: true
    },
    rating: {
        optional: { options: { nullable: true } },
        isFloat: true
    }           
}

exports.deleteKostSchema = {
    adminId: {
        notEmpty: {
            errorMessage: "Admin id is required"
        },
        isUUID: {
            errorMessage: "Admin id must be a UUID"
        },
        custom: {
            options: async (value) => {
                const admin = await Users.findOne({where: {id: value}, attributes: ['role']})
                if(!admin || admin.role !== 'admin') throw new Error("Admin not found")
                return true
            }
        }
    },
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
    }
}