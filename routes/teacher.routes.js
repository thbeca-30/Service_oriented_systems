const Router = require('express')

const router = new Router()

const teacherController = require('../controllers/teacher.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       required:
 *         - full_name
 *         - zuns
 *         - hard_soft
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the teacher
 *         full_name:
 *           type: string
 *           description: The teacher FIO
 *         zuns:
 *           type: array
 *           items:
 *              type: string
 *           description: The zuns of teacher
 *         hard_soft:
 *           type: array
 *           items:
 *              type: string
 *           description: The hard_soft of teacher
 *       example:
 *         full_name: Плеханов Семен Юрьевич
 *         zuns: ЯП высокого уровня, OS WINDOWS
 *         hard_soft: Компьютер, Проектор
 */

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: The teachers managing API
 */


/**
 * @swagger
 * /api/teachers/create:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: The teacher was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       500:
 *         description: Some server error
 */
router.post('/create', teacherController.createTeacher)

/**
 * @swagger
 * /api/teachers/delete/{id}:
 *   delete:
 *     summary: Remove the teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *
 *     responses:
 *       201:
 *         description: The teacher was deleted
 *       404:
 *         description: The teacher was not found
 */
router.delete('/delete/:id', teacherController.deleteTeacher)

/**
 * @swagger
 * /api/teachers/get/{id}:
 *   get:
 *     summary: Get the teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The technical description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher is not found
 */
router.get('/get/:id', teacherController.getTeacher)

/**
 * @swagger
 * /api/teachers/getAll:
 *   get:
 *     summary: Returns the list of all the teachers
 *     tags: [Teachers]
 *     responses:
 *       201:
 *         description: The list of the teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */
router.get('/getAll', teacherController.getTeachers)

/**
 * @swagger
 * /api/teachers/edit/{id}:
 *  put:
 *    summary: Update the teacher by the id
 *    tags: [Teachers]
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
 *            $ref: '#/components/schemas/Teacher'
 *    responses:
 *      201:
 *        description: The teacher was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teacher'
 *      404:
 *        description: The teacher was not found
 *      500:
 *        description: Some error happened
 */
router.put('/edit/:id', teacherController.updateTeacher)

module.exports = router