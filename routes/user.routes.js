const Router = require('express')

const router = new Router()

const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         role:
 *           type: string
 *           description: The user's role
 *       example:
 *         email: n8@mail.ru
 *         password: "123456"
 *         role: USER
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users/registration:
 *    post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user's token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Such User already is exist
 */
router.post('/registration', userController.registration)

/**
 * @swagger
 * /api/users/login:
 *    post:
 *     summary: Log an exist user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user's token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

/**
 * @swagger
 * /api/users/getAll:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/getAll', userController.getUsers)

module.exports = router

