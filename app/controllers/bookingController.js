const Users = require('../models/usersModel.js')
const Kosts = require('../models/kostModel.js')
const Bookings = require('../models/bookingKostModel.js')
const { checkValidation } = require('../helper/checkValidation.js')
const {matchedData} = require('express-validator')

exports.userBookingKost = async (req, res) => {
    try {
        //check validation
        if(checkValidation(req, res) !== true) return

        //get data
        const data = matchedData(req)
        const {kostId : id, userId, bookingTime} = data

        //check if user exist
        const user = await Users.findOne({where : {id: userId}})

        if(!user){
            return res.status(404).send({
                statusCode : 404,
                message : "User not found"
            })
        }

        //get kost from db
        const kost = await Kosts.findOne({ where: { id }, attributes : ['id','availability'] })
        if(!kost){
            res.status(404).send({
                statusCode : 404,
                message : "Kost not found"
            })
        }

        const userBooking = await Bookings.findAll({where : {userId, bookingStatus : 'pending'}})

        if(userBooking.length >= 3){
            return res.status(409).send({
                statusCode : 409,
                message : "You have reached the maximum booking limit"
            })
        }


        //check availability
        const {availability} = kost
        const newAvailability = parseInt(availability) - 1

        if(newAvailability === -1){
            return res.status(409).send({
                statusCode : 409,
                message : "No room is available"
            })
        }

        //update availability
        await Kosts.update({availability : newAvailability}, {where : {id}})

        //add user booking to db
        const currentDate = new Date()
        const expDate = new Date()
        expDate.setDate(expDate.getDate()+7)

        await Bookings.create({userId, kostId : id, bookingDate : currentDate, bookingTime, bookingExpireDate : expDate, bookingStatus: 'pending', paymentStatus: 'pending'})

        res.status(201).send({
            statusCode: 201,
            message: "Booking success",
            data: id
        })

    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.getUserBookingKost = async (req, res) => {
    try {
        //check validation
        if(checkValidation(req, res) !== true) return

        //get data
        const data = matchedData(req)
        const {userId} = data

        //get user booking from db 
        const booking = await Bookings.findAll({where: {userId}, attributes: ['id', 'kostId', 'bookingDate', 'bookingexpireDate', 'bookingStatus', 'paymentStatus']})
        
        if(booking.length === 0){
            return res.status(404).send({
                statusCode : 404,
                message : "There is no booking yet"
            })
        }

        const bookedKosts = await Promise.all(booking.map(async (kost) => {
            const kostDetails = await Kosts.findOne({ where: { id: kost.kostId }, attributes: ['kostName'] })
            const kostName = kostDetails ? kostDetails.kostName : null
            return {
                kostName,
                ...kost.toJSON(),
            }
        }))

        res.status(200).send({
            statusCode: 200,
            message: "Success",
            data: bookedKosts
        })
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}