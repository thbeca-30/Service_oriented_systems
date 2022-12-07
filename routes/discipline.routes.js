const Router = require('express')

const router = new Router()
const disciplineController = require('../controllers/discipline.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Discipline:
 *       type: object
 *       required:
 *         - name
 *         - zuns
 *         - hard_soft
 *         - prepod
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the discipline
 *         name:
 *           type: string
 *           description: The discipline name
 *         zuns:
 *           type: array
 *           items:
 *              type: string
 *           description: The zuns of discipline
 *         hard_soft:
 *           type: array
 *           items:
 *              type: string
 *           description: The hard_soft of discipline
 *         prepod:
 *           type: string
 *           description: The qualification of the teacher
 *       example:
 *         name: Программирование
 *         zuns: ЯП высокого уровня, ЯП низкого уровня
 *         hard_soft: Компьютер, VS code
 *         prepod: Профессор
 */

/**
 * @swagger
 * tags:
 *   name: Disciplines
 *   description: The disciplines managing API
 */

/**
 * @swagger
 * /api/disciplines/create:
 *   post:
 *     summary: Create a new discipline
 *     tags: [Disciplines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discipline'
 *     responses:
 *       201:
 *         description: The discipline was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discipline'
 *       500:
 *         description: Some server error
 */
router.post('/create', disciplineController.createDiscipline)

/**
 * @swagger
 * /api/disciplines/delete/{id}:
 *   delete:
 *     summary: Remove the discipline by id
 *     tags: [Disciplines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discipline id
 *
 *     responses:
 *       201:
 *         description: The discipline was deleted
 *       404:
 *         description: The discipline was not found
 */
router.delete('/delete/:id', disciplineController.deleteDiscipline)

/**
 * @swagger
 * /api/disciplines/get/{id}:
 *   get:
 *     summary: Get the discipline by id
 *     tags: [Disciplines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The discipline id
 *     responses:
 *       200:
 *         description: The discipline description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discipline'
 *       404:
 *         description: Discipline is not found
 */
router.get('/get/:id', disciplineController.getDiscipline)

/**
 * @swagger
 * /api/disciplines/getAll:
 *   get:
 *     summary: Returns the list of all the disciplines
 *     tags: [Disciplines]
 *     responses:
 *       201:
 *         description: The list of the disciplines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discipline'
 */
router.get('/getAll', disciplineController.getDisciplines)


/**
 * @swagger
 * /api/disciplines/edit/{id}:
 *  put:
 *    summary: Update the discipline by the id
 *    tags: [Disciplines]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The discipline id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Discipline'
 *    responses:
 *      201:
 *        description: The discipline was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Discipline'
 *      404:
 *        description: The discipline was not found
 *      500:
 *        description: Some error happened
 */
router.put('/edit/:id', disciplineController.updateDiscipline)

module.exports = router