const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Unauthorized'
            })
        }
        
        req.user = decoded.user
        next()
    })
}