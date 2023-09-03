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
 *       400:
 *         description: Error en la solicitud.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       404:
 *         description: Paciente no encontrado.
 */
router.get("/paciente/:id", verificarAutenticacion, detallePaciente);

/**
 * @swagger
 * /paciente/registro:
 *   post:
 *     summary: Registrar un nuevo paciente
 *     description: Registra un nuevo paciente en la base de datos.
 *     tags:
 *       - Pacientes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Datos del paciente a registrar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'  
 *     responses:
 *       201:
 *         description: Paciente registrado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente registrado con éxito.
 *       400:
 *         description: Error en la solicitud.
 *         content:
 *           application/json:
 *             example:
 *               message: Error en la solicitud.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *         content:
 *           application/json:
 *             example:
 *               message: Se requiere autenticación.
 */
router.post("/paciente/registro", verificarAutenticacion, registrarPaciente);

/**
 * @swagger
 * /paciente/actualizar/{id}:
 *   put:
 *     summary: Actualizar paciente por ID
 *     description: Actualiza los datos de un paciente existente por su ID.
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paciente a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Nuevos datos del paciente a actualizar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'  # Referencia al esquema del modelo de Paciente
 *     responses:
 *       200:
 *         description: Paciente actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Paciente actualizado 
 *       400:
 *         description: Error en la solicitud.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       404:
 *         description: Paciente no encontrado.
 *       500:
 *         description: Error interno del servidor.
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
 *       400:
 *         description: Error en la solicitud.
 *       401:
 *         description: No autorizado, se requiere autenticación.
 *       404:
 *         description: Paciente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/paciente/eliminar/:id", verificarAutenticacion, eliminarPaciente);

export default router