const {matchedData, check} = require('express-validator')
const Kosts = require('../models/kostModel.js')
const { checkValidation } = require('../helper/checkValidation.js')
require('dotenv').config()

exports.addKost = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //get matched data
        const data = matchedData(req)
        const {adminId : adminRelation} = data
        
        //add kost to db
        await Kosts.create({adminRelation, ...data})

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

//FIXME: come back here, maybe there is something missing
// this code will be only get the kost by city (by query, cuz this is GET route)
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
            attributes : ['id', 'kostName', 'description', 'kostType', 'price', 'image', 'city', 'address', 'latitude', 'longitude']
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
        const kosts = await Kosts.findAll({where : {city: data.city}, attributes: ['id', 'kostName', 'description','kostType', 'facilities', 'price', 'image', 'city', 'address', 'latitude', 'longitude']})

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
//TODO:  addReview, getReviews, bookingKost (delete if clear)
