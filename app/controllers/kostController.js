const {matchedData} = require('express-validator')
const Kosts = require('../models/kostModel.js')
const { checkValidation } = require('../helper/checkValidation.js')
const Users = require('../models/usersModel.js')
const Reviews = require('../models/reviewModel.js')
require('dotenv').config()

exports.addKost = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //get matched data
        const data = matchedData(req)
        const {adminId : adminRelation} = data
        
        //add kost to db
        await Kosts.create({adminRelation, ...data, rating: 0})

        res.status(201).send({
            statusCode : 201,
            message : "Kost has been added successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.getAllKost = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //get data
        const data = matchedData(req)

        //get kosts from db
        const kosts = await Kosts.findAll({
            where : {
                city : data.city
            },
            attributes : ['id', 'kostName', 'description', 'kostType', 'price', 'image', 'city', 'address', 'latitude', 'longitude', 'rating']
        })

        if(kosts.length === 0){
            return res.status(404).send({
                statusCode : 404,
                message : "Kost not found"
            })
        }
        res.status(200).send({
            statusCode : 200,
            message : "Success",
            data : kosts
        })

    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.getKost = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //get data
        const data = matchedData(req)
        const {kostId : id} = data

        //get kost from db
        const kost = await Kosts.findOne({where : {id}})

        if(!kost){
            return res.status(404).send({
                statusCode : 404,
                message : "Kost not found"
            })
        }

        res.status(200).send({
            statusCode : 200,
            message : "Success",
            data : kost
        })

    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"Server error",
            error
        })
    }
}

exports.editKost = async (req, res) => {
    try {
        //check validation
        if(checkValidation(req, res) !== true) return

        //get data
        const data = matchedData(req)
        const {kostId: id, adminId: adminRelation} = data

        //get kost from db
        const kost = await Kosts.findOne({where:{id, adminRelation}})

        if(!kost){
            return res.status(400).send({
                statusCode : 400,
                message : "Something went wrong"
            })
        }

        console.log(data)
        //udpate kost
        await Kosts.update({...data}, {where : {id}})

        res.status(200).send({
            statusCode: 200,
            message: "Kost update successfully"
        })

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Server error',
            error
        })
    }
}

exports.deleteKost = async (req, res) => {
    try {
        //check validation
        if(checkValidation(req, res) !== true) return

        //get data
        const data = matchedData(req)
        const {kostId: id, adminId: adminRelation} = data

        //get kost from db  
        const kost = await Kosts.findOne({where : {id, adminRelation}})

        if(!kost){
            return res.status(400).send({
                statusCode : 400,
                message : "Something went wrong"
            })
        }

        //delete kost    
        await Kosts.destroy({where : {id}})

        res.status(200).send({
            statusCode: 200,
            message: "Kost deleted successfully",
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Server error",
            error
        })
    }
}

exports.getFilteredKost = async (req, res) => {
    try {
        //check validation
        if(checkValidation(req, res) !== true) return

        //get data
        const data = matchedData(req)

        //get kosts from db
        const kosts = await Kosts.findAll({where : {city: data.city}, attributes: ['id', 'kostName', 'description','kostType', 'facilities', 'price', 'image', 'city', 'address', 'latitude', 'longitude', 'rating']})

        const kostsFiltered = kosts.filter((kost) => {
            //filter for the price
            const [minPrice, maxPrice] = data.price.split('-').map(Number)
            const price = parseInt(kost.price)
            const priceFiltered = price >= minPrice && price <= maxPrice

            //filter for the facilities
            const facilities = new Set(data.facilities.split(', '))
            const kostFacilities = new Set(kost.facilities.split(', '))
            const facilitiesFiltered = [...facilities].every(facility => kostFacilities.has(facility))

            //filter for kost type
            const type = data.type
            const kostTypeFiltered = type == kost.kostType 

            return kostTypeFiltered && priceFiltered && facilitiesFiltered
        })
        
        if(kostsFiltered.length === 0){
            return res.status(404).send({
                statusCode : 404,
                message : "Kost not found"
            })
        }

        res.status(200).send({
            statusCode : 200,
            message : "Success", 
            data : kostsFiltered
        })
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.addReview = async (req, res) => {
    try {
        //check validation
        if(checkValidation(req, res) !== true) return

        //get data
        const { kostId, userId, rating, comment } = matchedData(req)

        //get kost from db
        const kost = await Kosts.findOne({ where: { id: kostId } })

        if(!kost){
            return res.status(404).send({
                statusCode : 404,
                message : "Kost not found"
            })
        }

        //check if users already reviewed
        const review = await Reviews.findOne({ where: { kostId, userId } })

        if(review){
            return res.status(400).send({
                statusCode : 400,
                message : "You already reviewed this kost",
            })
        }

        //get all reviews rating
        const reviewRatings = await Reviews.findAll({ where: { kostId }, attributes: ['rating'] })

        //calculate new rating
        const newRating = (reviewRatings.reduce((a, b) => a + parseInt(b.dataValues.rating), 0) + parseInt(rating)) / (reviewRatings.length + 1)

        //add review to db
        await Reviews.create({ kostId, userId, rating, comment })

        res.status(201).send({
            statusCode : 201,
            message : "Review added successfully",
            newRating: newRating.toFixed(1)
        })

    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.getReview = async (req, res) => {
    try {
        //check validation
        if(checkValidation(req, res) !== true) return
        
        //get data
        const data = matchedData(req)
        const {kostId} = data

        //get reviews from db
        const reviews = await Reviews.findAll({where : {kostId}, attributes: ['id', 'userId', 'rating', 'comment']})

        res.status(200).send({
            statusCode : 200,
            message : "Success",
            data : reviews
        })
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

//TODO:  bookingKost (delete if clear)