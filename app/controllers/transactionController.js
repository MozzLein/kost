const {matchedData} = require('express-validator')
const Kosts = require('../models/kostModel.js')
const Bookings = require('../models/bookingKostModel.js')
const Transaction = require('../models/transactionModel.js')
const { checkValidation } = require('../helper/checkValidation.js')

exports.userMakeTransaction = async (req, res) => {
    try {
        //check validation
        if(checkValidation(req, res) !== true) return

        //get data
        const data = matchedData(req)
        const {kostId, userId} = data

        //get kost from db
        const kost = await Kosts.findOne({where : {id : kostId}, atributes: ['price']})

        if(!kost){
            return res.status(404).send({
                statusCode : 404,
                message : "Kost not found"
            })
        }

        //create transaction
        const checkBooking = await Bookings.findOne({where : {kostId, userId}})
        if(!checkBooking){
            return res.status(404).send({
                statusCode : 404,
                message : "You haven't booking this kost yet"
            })
        }

        //insert data to transaction table
        await Transaction.create({...data, totalAmmount : kost.price, status : 'pending', paymentMethod: kost.paymentMethod})

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Server error",
            error   
        })
    }
}


//delete the feature that have been created
//TODO: add feature for admin to getAllTransaction, getTransactionDetail, updateTransactionStatus, 