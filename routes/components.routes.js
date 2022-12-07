const Router = require('express')

const router = new Router()
const componentsController = require('../controllers/components.controller')

router.get('/', componentsController.getComponents)

module.exports = router