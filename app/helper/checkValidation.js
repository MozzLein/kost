const {validationResult} = require('express-validator')

exports.checkValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            statusCode: 400,
            message: "Something went wrong",
            errors: errors.array(),
        });
    }
    return true;
};
