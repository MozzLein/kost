const express = require('express')
const router = express.Router()
const {checkSchema} = require('express-validator')
const { userRegistrationSchema, userLoginSchema} = require('../middleware/schemas/userAuthValidationSchemas')
const { getUserProfileSchema, editUserProfileSchema, deleteUserSchema} = require('../middleware/schemas/userValidationSchemas')
const { getUserProfile, editUserProfile, deleteUser } = require('../controllers/userController')
const { getAdminProfile, editAdminProfile, addBankAccount, editBankAccount, deleteBankAccount, deleteAdmin } = require('../controllers/adminController')
const { userRegister, userLogin, getUserRegister, getUserLogin } = require('../controllers/authController')
const { verifyToken } = require('../middleware/authMiddleware')
const { adminBankAccountSchema, adminDeleteSchema } = require('../middleware/schemas/adminValidationSchemas')
const { getAllKost, addKost, getKost, editKost, deleteKost } = require('../controllers/kostController')
const { getAllKostSchema, addKostSchema, getKostSchema, editKostSchema, deleteKostSchema } = require('../middleware/schemas/kostValidationSchemas')

//auth routes
router.get('/auth/register', getUserRegister)
router.get('/auth/login', getUserLogin)

//user routes
router.get('/user/:id', [verifyToken, checkSchema(getUserProfileSchema)], getUserProfile)

//FIXME: later add verify to this line of route.
router.get('/kost/', checkSchema(getAllKostSchema), getAllKost)
router.get('/kost/:kostId', checkSchema(getKostSchema), getKost)

router.post('/auth/register', checkSchema(userRegistrationSchema),  userRegister) 
router.post('/auth/login', checkSchema(userLoginSchema), userLogin)


router.put('/user/:userId/edit', [verifyToken, checkSchema(editUserProfileSchema)], editUserProfile)

router.delete('/user/:userId/delete', [verifyToken, checkSchema(deleteUserSchema)], deleteUser)

//admin routes 
router.get('/admin/:userId', [verifyToken, checkSchema(getUserProfileSchema)], getAdminProfile)

router.post('/admin/:adminId/account', [verifyToken, checkSchema(adminBankAccountSchema)], addBankAccount)

//FIXME: later add verify to this line of route.
router.post('/admin/:adminId/kost/add', checkSchema(addKostSchema), addKost)

router.put('/admin/:userId', [verifyToken, checkSchema(editUserProfileSchema)], editAdminProfile)
router.put('/admin/:adminId/account/edit', [verifyToken, checkSchema(adminBankAccountSchema)], editBankAccount)
router.put('/admin/:adminId/kost/:kostId/edit', checkSchema(editKostSchema), editKost)

router.delete('/admin/:userId', [verifyToken, checkSchema(adminDeleteSchema)], deleteAdmin)
router.delete('/admin/:adminId/account/delete', [verifyToken, checkSchema(adminDeleteSchema)], deleteBankAccount)
router.delete('/admin/:adminId/kost/:kostId/delete', checkSchema(deleteKostSchema), deleteKost)

module.exports = router