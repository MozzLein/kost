const {matchedData} = require('express-validator')
const Users = require('../models/usersModel.js')
const { checkValidation } = require('../helper/checkValidation.js')
require('dotenv').config()

exports.getAdminProfile = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check if data matched
        const data = matchedData(req)
        const { userId: id } = data

        //check if the user exist
        const adminInformation = await Users.findOne({ 
            where: { id }, 
            attributes: ['id', 'kostRelationId', 'profile_picture', 'name', 'email', 'phoneNumber', 'role', 'bankName', 'bankAccountName', 'bankAccountNumber'] 
        })

        if(!adminInformation || adminInformation.role !== 'admin') {
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
            data : adminInformation
        })  
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })  
    }
}

exports.editAdminProfile = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check if data matched
        const data = matchedData(req)
        const { userId : id, name, email, phoneNumber, profile_picture} = data

        //check if the user exist
        const userInformation = await Users.findOne({ where: { id }, attributes: ['id', 'profile_picture', 'name', 'email', 'role', 'phoneNumber', 'bankName', 'bankAccountName', 'bankAccountNumber']})
        if(!userInformation || userInformation.role !== 'admin') {
            res.status(404).send({
                statusCode : 404,
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

exports.addBankAccount = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check matched data
        const data = matchedData(req)
        const { adminId: id, bankName, bankAccountName, bankAccountNumber } = data

        //check if the user exist
        const userInformation = await Users.findOne({ where: { id }, attributes: ['role', 'bankName', 'bankAccountName', 'bankAccountNumber']})

        if(!userInformation || userInformation.role !== 'admin') {
            res.status(404).send({
                statusCode : 404,
                message : "User not found"  
            })  
            return
        }

        //update user
        await Users.update({bankName, bankAccountName, bankAccountNumber}, {where: {id}})

        res.status(200).send({
            statusCode: 200,
            message: "Bank account has been added successfully"
        })

    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.editBankAccount = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check matched data    
        const data = matchedData(req)
        const { adminId: id, bankName, bankAccountName, bankAccountNumber } = data

        //check if the user exist
        const userInformation = await Users.findOne({ where: { id }, attributes: ['id', 'profile_picture', 'name', 'email', 'role', 'phoneNumber', 'bankName', 'bankAccountName', 'bankAccountNumber']})
        if(!userInformation || userInformation.role !== 'admin') {
            res.status(404).send({
                statusCode : 404,
                message : "User not found"  
            })  
            return
        }

        //update user
        await Users.update({bankName, bankAccountName, bankAccountNumber}, {where: {id}})

        res.status(200).send({
            statusCode: 200,
            message: "Bank account has been updated successfully"
        })

    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }

}

exports.deleteBankAccount = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check matched data
        const data = matchedData(req)
        const { adminId: id } = data

        //check if the user exist    
        const userInformation = await Users.findOne({ where: { id }})
        if(!userInformation) {
            res.status(404).send({
                statusCode : 404,
                message : "User not found"  
            })  
            return
        }

        //update user
        await Users.update({bankName: null, bankAccountName: null, bankAccountNumber: null}, {where: {id}})

        res.status(200).send({
            statusCode: 200,
            message: "Bank account has been deleted successfully"
        })

    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check matched data
        const data = matchedData(req)
        const { adminId: id } = data

        //check if the user exist
        const userInformation = await Users.findOne({where: {id}})
        if(!userInformation){
            res.status(404).send({
                statusCode : 404,
                message : "User not found"  
            })  
            return
        }
        //delete user
        await Users.destroy({where: {id}})
        res.status(200).send({
            statusCode: 200,
            message: "User has been deleted successfully"
        })
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}
