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
const { getAllKost, addKost, getKost, editKost, deleteKost, getFilteredKost, addReview, getReview } = require('../controllers/kostController')
const { getAllKostSchema, addKostSchema, getKostSchema, editKostSchema, deleteKostSchema, getFilteredKostSchema } = require('../middleware/schemas/kostValidationSchemas')
const { addReviewSchema, getReviewSchema } = require('../middleware/schemas/reviewValidationSchemas')
const { userBookingKostSchema, getUserBookingKostSchema } = require('../middleware/schemas/bookingKostValidationSchemas')
const { userBookingKost, getUserBookingKost } = require('../controllers/bookingController')

//auth routes
router.get('/auth/register', getUserRegister)
router.get('/auth/login', getUserLogin)

//user routes
router.get('/user/:id', [verifyToken, checkSchema(getUserProfileSchema)], getUserProfile)

router.get('/kost/:city', checkSchema(getAllKostSchema), getAllKost)
router.get('/kost/:kostId', checkSchema(getKostSchema), getKost)
router.get('/kost/:city/filter/', checkSchema(getFilteredKostSchema), getFilteredKost)
router.get('/kost/:kostId/review', checkSchema(getReviewSchema), getReview)
router.get('/user/:userId/booking', checkSchema(getUserBookingKostSchema), getUserBookingKost)

router.post('/auth/register', checkSchema(userRegistrationSchema),  userRegister) 
router.post('/auth/login', checkSchema(userLoginSchema), userLogin)
router.post('/kost/:kostId/review/:userId/', [checkSchema(addReviewSchema)], addReview)
router.post('/kost/:kostId/booking/:userId', [ checkSchema(userBookingKostSchema)], userBookingKost)
router.post('/kost/:kostId/transaction/:userId')

router.put('/user/:userId/edit', [verifyToken, checkSchema(editUserProfileSchema)], editUserProfile)

router.delete('/user/:userId/delete', [verifyToken, checkSchema(deleteUserSchema)], deleteUser)

//admin routes 
router.get('/admin/:userId', [verifyToken, checkSchema(getUserProfileSchema)], getAdminProfile)

router.post('/admin/:adminId/account', [verifyToken, checkSchema(adminBankAccountSchema)], addBankAccount)

router.post('/admin/:adminId/kost/add', checkSchema(addKostSchema), addKost)

router.put('/admin/:userId', [verifyToken, checkSchema(editUserProfileSchema)], editAdminProfile)
router.put('/admin/:adminId/account/edit', [verifyToken, checkSchema(adminBankAccountSchema)], editBankAccount)
router.put('/admin/:adminId/kost/:kostId/edit', checkSchema(editKostSchema), editKost)

router.delete('/admin/:userId', [verifyToken, checkSchema(adminDeleteSchema)], deleteAdmin)
router.delete('/admin/:adminId/account/delete', [verifyToken, checkSchema(adminDeleteSchema)], deleteBankAccount)
router.delete('/admin/:adminId/kost/:kostId/delete', checkSchema(deleteKostSchema), deleteKost)

module.exports = router


//FIXME: dont forget to add verifyToken to routes
