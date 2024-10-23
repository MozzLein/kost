const { checkValidation } = require('../helper/checkValidation.js')
const Users = require('../models/usersModel.js')
const {matchedData} = require('express-validator')
require('dotenv').config()

exports.getUserProfile = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check if data matched
        const data = matchedData(req)
        const { id } = data

        //check if the user exist
        const userInformation = await Users.findOne({ where: { id }, attributes: ['id', 'profile_picture', 'name', 'email', 'phoneNumber', 'role'] })
        if(!userInformation || userInformation.role !== 'user') {
            res.status(404).send({
                statusCode : 404,
                message : "User not found"  
            })  
            return
        }

        //send response
        res.status(200).send({
            statusCode : 200,
            message : "Success",
            data : userInformation
        })  
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })  
    }
}

exports.editUserProfile = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check if data matched
        const data = matchedData(req)
        const {userId : id, name, email, phoneNumber, profile_picture } = data

        //check if the user exist
        const userInformation = await Users.findOne({ where: { id }, attributes: ['id', 'profile_picture', 'name', 'email', 'phoneNumber'] })
        if(!userInformation) {
            res.status(404).send({
                message : "User not found"  
            })  
            return
        }

        //update user
        await Users.update({name, email, phoneNumber, profile_picture}, {where: {id}})
        res.status(200).send({
            statusCode : 200,
            message : "Data has been updated successfully",
            data : {userInformation, newEmail : email}
        })

    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //get data
        const id = matchedData(req).userId

        //check if the user exist
        const userInformation = await Users.findOne({ where: { id }, attributes: ['id', 'profile_picture', 'name', 'email', 'phoneNumber'] })
        if(!userInformation) {
            res.status(404).send({
                message : "User not found"  
            })  
            return
        }

        //delete user
        await Users.destroy({where: {id}})
        res.status(200).send({
            statusCode : 200,
            message : "User has been deleted successfully"
        })
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}


//TODO: make a feature for user rating and review for "kost" that they have stayed in
//TODO: add feature for forgot password like adding reset password token and send email to reset password
//TODO: open history of this project in chatgpt based on this link https://chatgpt.com/c/67128d07-008c-8001-aead-4b25399d135a