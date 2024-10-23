const bcrypt = require('bcrypt')
const {generateUUID} = require('../helper/generateId.js')
const jwt = require('jsonwebtoken')
const { matchedData } = require('express-validator')
const Users = require('../models/usersModel.js')
const { checkValidation } = require('../helper/checkValidation.js')
require('dotenv').config()

exports.getUserRegister = (req, res) => {
    try {
        res.status(200).render('register')
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.userRegister = async (req, res) => {
    try {
        //check validation
        if (checkValidation(req, res) !== true) return 
        
        //check if data matched
        const data = matchedData(req)
        delete data.confirmPassword
        const {password} = data

        //create hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const id = generateUUID()
        data.password = hashedPassword

        //input data to db
        await Users.create({ id, ...data, profile_picture : 'default.jpg', role : 'user' })

        res.status(201).send({
            statusCode : 201,
            message : "Registered successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.getUserLogin = (req, res) => {
    try {
        res.status(200).render('login')
    } catch (error) {
        res.status(500).send({
            statusCode : 500,
            message : "Server error",
            error
        })
    }
}

exports.userLogin = async (req, res) => {    
    try {
        //check validation
        if (checkValidation(req, res) !== true) return

        //check if data matched
        const data = matchedData(req)
        const { username } = data
        

        //check userInformation
        const userInformation = await Users.findOne({ where: { username }, attributes: ['id', 'username', 'name'] })


        //generate token
        const token = jwt.sign({ user: { id: userInformation.id, username: userInformation.username, name: userInformation.name} }, process.env.ACCESS_SECRET_KEY, { expiresIn: '10m' })
        return res.status(200).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' }).send({
            statusCode : 200,
            message : "Success",
            data : userInformation
        })   
    
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}