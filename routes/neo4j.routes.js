const Router = require('express')
const neo4jController = require('../controllers/neo4j.controller')

const router = new Router()

router.get('/', async(req, res) => {
    const result = await neo4jController.findAll()
    res.json(result)
})

module.exports = router