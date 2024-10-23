exports.adminBankAccountSchema = {
    adminId: {
        notEmpty: {
            errorMessage: "Id is required"
        },
        isUUID: true
    },
    bankName: {
        notEmpty: {
            errorMessage: "Bank Name is required"
        },
        isString: true
    },
    bankAccountName: {
        notEmpty: {
            errorMessage: "Bank Account Name is required"
        },
        isString: true
    },
    bankAccountNumber: {
        notEmpty: {
            errorMessage: "Bank Account Number is required"
        },
        isNumeric: true,
        errorMessage: "Bank Account Number must be numeric"
    }
}

exports.adminDeleteSchema = {
    adminId: {
        notEmpty: {
            errorMessage: "Id is required"
        },
        isUUID: true
    }
}