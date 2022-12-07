const Router = require('express')

const router = new Router()
const technicalsController = require('../controllers/technical.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Technical:
 *       type: object
 *       required:
 *         - number
 *         - hard_soft
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the technical
 *         number:
 *           type: integer
 *           description: The technical number
 *         hard_soft:
 *           type: array
 *           items:
 *              type: string
 *           description: The hard_soft of technical
 *       example:
 *         number: 5555
 *         hard_soft: Компьютер, Проектор
 */

/**
 * @swagger
 * tags:
 *   name: Technicals
 *   description: The technicals managing API
 */


/**
 * @swagger
 * /api/technicals/create:
 *   post:
 *     summary: Create a new technical
 *     tags: [Technicals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Technical'
 *     responses:
 *       201:
 *         description: The technical was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technical'
 *       500:
 *         description: Some server error
 */
router.post('/create', technicalsController.createTechnical)

/**
 * @swagger
 * /api/technicals/delete/{id}:
 *   delete:
 *     summary: Remove the technical by id
 *     tags: [Technicals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The technical id
 *
 *     responses:
 *       201:
 *         description: The technical was deleted
 *       404:
 *         description: The technical was not found
 */
router.delete('/delete/:id', technicalsController.deleteTechnical)

/**
 * @swagger
 * /api/technicals/get/{id}:
 *   get:
 *     summary: Get the technical by id
 *     tags: [Technicals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The technical id
 *     responses:
 *       200:
 *         description: The technical description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technical'
 *       404:
 *         description: Technical is not found
 */
router.get('/get/:id', technicalsController.getTechnical)

/**
 * @swagger
 * /api/technicals/getAll:
 *   get:
 *     summary: Returns the list of all the technicals
 *     tags: [Technicals]
 *     responses:
 *       201:
 *         description: The list of the technicals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Technical'
 */
router.get('/getAll', technicalsController.getTechnicals)

/**
 * @swagger
 * /api/technicals/edit/{id}:
 *  put:
 *    summary: Update the technical by the id
 *    tags: [Technicals]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The technical id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Technical'
 *    responses:
 *      201:
 *        description: The technical was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Technical'
 *      404:
 *        description: The technical was not found
 *      500:
 *        description: Some error happened
 */
router.put('/edit/:id', technicalsController.updateTechnical)

module.exports = router