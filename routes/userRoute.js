const express = require('express')
const router = express.Router()

const {
    createUser, authUser, deleteUser, updateUser, findAllUser
} = require('../controllers/userController')
const { userProtect } = require('../middlewares/authMiddleware')
const { adminProtect } = require('../middlewares/adminMiddleware')

router.route('/register').post(createUser)
router.route('/login').post(authUser)
router.route('/delete/:id').delete(deleteUser)
router.route('/update/:id').put(userProtect, updateUser)
router.route('/findAll').get(adminProtect, findAllUser)

module.exports = router