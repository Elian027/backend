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
 *       - BearerAuth: []
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
 *     summary: Registrar un nuevo paciente
 *     description: Registrar un nuevo paciente en el sistema.
 *     tags:
 *       - Pacientes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               propietario:
 *                 type: string
 *               email:
 *                 type: string
 *               celular:
 *                 type: string
 *               convencional:
 *                 type: string
 *               ingreso:
 *                 type: string
 *               salida:
 *                 type: string
 *               sintomas:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente registrado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente registrado con éxito.
 *       400:
 *         description: Datos de registro no válidos o falta de autenticación.
 *         content:
 *           application/json:
 *             example:
 *               message: Datos de registro no válidos o falta de autenticación.
 *       401:
 *         description: No autorizado, token de acceso no válido.
 *         content:
 *           application/json:
 *             example:
 *               message: No autorizado, token de acceso no válido.
 */
router.post("/paciente/registro", verificarAutenticacion, registrarPaciente);

/**
 * @swagger
 * /paciente/actualizar/{id}:
 *   put:
 *     summary: Actualizar un paciente existente
 *     description: Actualiza los datos de un paciente existente en el sistema.
 *     tags:
 *       - Pacientes
 *     security:
 *       - BearerAuth: []
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
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               propietario:
 *                 type: string
 *               email:
 *                 type: string
 *               celular:
 *                 type: string
 *               convencional:
 *                 type: string
 *               ingreso:
 *                 type: string
 *               salida:
 *                 type: string
 *               sintomas:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente actualizado con éxito.
 *       400:
 *         description: Datos de actualización no válidos o falta de autenticación.
 *         content:
 *           application/json:
 *             example:
 *               message: Datos de actualización no válidos o falta de autenticación.
 *       404:
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
 *       204:
 *         description: Paciente eliminado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente eliminado con éxito.
 *       404:
 *         description: Paciente no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente no encontrado.
 */
router.delete("/paciente/eliminar/:id", verificarAutenticacion, eliminarPaciente);

export default router