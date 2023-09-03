import {Router} from 'express'
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
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente' // Define el esquema del objeto Paciente aquí
 */
router.get("/pacientes",verificarAutenticacion,listarPacientes);


router.get("/paciente/:id",verificarAutenticacion, detallePaciente);
router.post("/paciente/registro", verificarAutenticacion,registrarPaciente);
router.put("/paciente/actualizar/:id", verificarAutenticacion,actualizarPaciente);
router.delete("/paciente/eliminar/:id", verificarAutenticacion,eliminarPaciente);

export default router