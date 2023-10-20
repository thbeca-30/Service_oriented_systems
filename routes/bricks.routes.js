const Router = require('express')

const router = new Router()
const bricksController= require('../controllers/bricks.controller')


/**
 * @swagger
 * components:
 *   schemas:
 *     Brick:
 *       type: object
 *       required:
 *         - name
 *         - number
 *         - full_name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the brick
 *         name:
 *           type: string
 *           description: Name of discipline in Brick
 *         number:
 *           type: integer
 *           description: Audience number in Brick
 *         full_name:
 *           type: string
 *           description: Name of teacher in Brick
 *       example:
 *         name: Программирование
 *         number: 1111
 *         full_name: Петров Игорь Иванович
 */

/**
 * @swagger
 * tags:
 *   name: Bricks
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/bricks/getBricks:
 *   get:
 *     summary: Returns the list of bricks
 *     tags: [Bricks]
 *     responses:
 *       201:
 *         description: The list of the bricks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brick'
 */
router.get('/getBricks', bricksController.getBricks)

/**
 * @swagger
 * /api/bricks/getBricksForGraph:
 *   get:
 *     summary: Returns the list of bricks for graph
 *     tags: [Bricks]
 *     responses:
 *       201:
 *         description: The list of the bricks for graph
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brick'
 */
router.get('/getBricksForGraph', bricksController.getBricksForGraph)
// router.get('/getAllForOne', bricksController.getAllForOne)
router.post('/getBricksForGraphFilter', bricksController.getBricksForGraphFilter)
router.post('/testMethod', bricksController.testMethod)

module.exports = router