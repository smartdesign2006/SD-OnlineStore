const router = require('express').Router()
const {
    adminProductController,
    adminUserController,
    infoController,
    productController,
    userController
} = require('../controllers')
const { attachCurrentUser } = require('../utils/authenticate')

router.use('/', attachCurrentUser)
router.use('/api/user/', userController)
router.use('/api/product/', productController)
router.use('/api/info/', infoController)
router.use('/api/admin/product', adminProductController)
router.use('/api/admin/user', adminUserController)

module.exports = router