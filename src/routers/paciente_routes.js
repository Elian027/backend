import { Router } from 'express'
import {
    actualizarPaciente,
    detallePaciente,
    eliminarPaciente,
    listarPacientes,
    registrarPaciente,
} from "../controllers/paciente_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router()

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Obtener lista de pacientes.
 *     description: Obtiene una lista de todos los pacientes.
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes.
 *         content:
 *           application/json:
 *              example:
 *               - id: 1
 *                 nombre: Paciente1
 *                 propietario: Dueño1
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *         content:
 *           application/json:
 *             example:
 *               message: No autorizado, se requiere autenticación.
 */
router.get("/pacientes", verificarAutenticacion, listarPacientes);

/**
 * @swagger
 * /paciente/{id}:
 *   get:
 *     summary: Obtener detalles de un paciente por ID
 *     description: Obtiene los detalles de un paciente según su ID.
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paciente a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del paciente obtenidos con éxito.
 *         content:
 *           application/json:
 *              example:
 *                 paciente: Max
 *                 propietario: Juan 
 *                 email: nuevo@gmail.com
 *                 celular: 0987654321
 *                 convencional: 02312456
 *                 sintomas: vomito, etc
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *         content:
 *           application/json:
 *             example:
 *               message: No autorizado, se requiere autenticación.
 *       404:
 *         description: Paciente no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente no encontrado.
 */
router.get("/paciente/:id", verificarAutenticacion, detallePaciente);

/**
 * @swagger
 * /paciente/registro:
 *   post:
 *     summary: Registrar nuevo paciente
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Pacientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       '200':
 *         description: Paciente registrado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente registrado exitosamente
 *       '400':
 *         description: Campos incompletos
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos
 */
router.post("/paciente/registro", verificarAutenticacion, registrarPaciente);

/**
 * @swagger
 * /paciente/actualizar/{id}:
 *   put:
 *     summary: Actualizar perfil de un paciente por ID
 *     description: Actualiza el perfil de un paciente existente por su ID.
 *     tags:
 *       - Pacientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paciente a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       '200':
 *         description: Perfil del paciente actualizado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               message: Perfil del paciente actualizado exitosamente
 *       '400':
 *         description: Campos incompletos o formato incorrecto de datos.
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o formato incorrecto de datos.
 *       '404':
 *         description: Paciente no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente no encontrado.
 */
router.put("/paciente/actualizar/:id", verificarAutenticacion, actualizarPaciente);

/**
 * @swagger
 * /paciente/eliminar/{id}:
 *   delete:
 *     summary: Eliminar paciente por ID
 *     description: Elimina un paciente existente por su ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paciente a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Paciente eliminado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente eliminado con éxito
 *       404:
 *         description: Paciente no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente no encontrado.
 */
router.delete("/paciente/eliminar/:id", verificarAutenticacion, eliminarPaciente);

/**
 * @swagger
 * components:
 *    schemas:
 *     Paciente:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         propietario:
 *           type: string
 *         email:
 *           type: string
 *         celular:
 *           type: string
 *         convencional:
 *           type: string
 *         sintomas:
 *           type: string
 *       required:
 *         - nombre
 *         - propietario
 *         - email
 *         - celular
 *         - convencional
 *         - sintomas
 *    securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export default router