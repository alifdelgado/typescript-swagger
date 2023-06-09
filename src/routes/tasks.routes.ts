import { Router } from "express";
import {
  create,
  destroy,
  findAll,
  findById,
  update,
} from "../controllers/tasks.controller";

const router = Router();

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Task:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: the auto-generated id of task
 *          name:
 *            type: string
 *            description: the name of the task
 *          description:
 *            type: string
 *            description: then description of the task
 *        required:
 *          - name
 *          - description
 *        example:
 *          id: 7a33caab-a1f4-4035-bb06-7b941df95665
 *          name: First task
 *          description: Play the new video game
 *      TaskNotFound:
 *        type: object
 *        properties:
 *          msg:
 *            type: string
 *            description: a message fot the not found task
 *        example:
 *          msg: Task not found
 *    parameters:
 *      taskId:
 *        in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: the task id
 */

/**
 *  @swagger
 *  tags:
 *     name: Tasks
 *     description: Tasks endpoint
 */

/**
 * @swagger
 * /api/tasks:
 *  get:
 *     summary: Return a Task list
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: the list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", findAll);

/**
 *  @swagger
 *  /api/tasks/{id}:
 *    get:
 *      summary: Return a Task filtered by the id
 *      tags: [Tasks]
 *      parameters:
 *        - $ref: '#/components/parameters/taskId'
 *      responses:
 *        200:
 *          description: A task retrieved by the id
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Task'
 *        404:
 *          description: Task not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskNotFound'
 */
router.get("/:id", findById);

/**
 *  @swagger
 *  /api/tasks:
 *  post:
 *    summary: Create a new task
 *    tags: [Tasks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      201:
 *        description: task created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Task'
 *      500:
 *        description: some server error
 */
router.post("/", create);

/**
 *  @swagger
 *  /api/tasks/{id}:
 *  put:
 *    summary: Update a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: task updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Task'
 *      500:
 *        description: task could not be updated
 */
router.put("/:id", update);

/**
 *  @swagger
 *  /api/tasks/{id}:
 *  delete:
 *    summary: Delete a task by id
 *    tags: [Tasks]
 *    parameters:
 *      - $ref: '#/components/parameters/taskId'
 *    responses:
 *      204:
 *        description: Delete a task
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                msg:
 *                  type: string
 *                  description: Task deleted
 *              example:
 *                msg: Task deleted
 *      404:
 *        description: Task not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.delete("/:id", destroy);

export default router;
