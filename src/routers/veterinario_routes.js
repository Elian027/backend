import { Router } from "express";
import {
    login,
    perfil,
    registro,
    confirmEmail,
    listarVeterinarios,
    detalleVeterinario,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword,
} from "../controllers/veterinario_controller.js";
import verificarAutenticacion from '../middlewares/autenticacion.js'

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Iniciar sesión de un usuario registrado.
 *     tags:
 *       - Veterinarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario autenticado con éxito.
 *       401:
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             example:
 *               message: Credenciales inválidas.
 */
router.post('/login',login)

/**
 * @swagger
 * /registro:
 *   post:
 *     summary: Registrar nuevo veterinario
 *     tags:
 *      - Veterinarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeterinarioInput'
 *     responses:
 *       '200':
 *         description: Veterinario registrado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Veterinario registrado exitosamente
 *       '400':
 *         description: Campos incompletos o email ya registrado
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o email ya registrado
 */
router.post('/registro',registro)

/**
 * @swagger
 * /confirmar/{token}:
 *   get:
 *     summary: Confirmar el correo electrónico de un usuario
 *     description: Confirma el correo electrónico de un usuario utilizando un token de confirmación.
 *     tags:
 *       - Autenticación
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token de confirmación del correo electrónico del usuario.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Correo electrónico confirmado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Correo electrónico confirmado con éxito.
 *       404:
 *         description: Token de confirmación no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Token de confirmación no encontrado.
 */
router.get('/confirmar/:token', confirmEmail);

/**
 * @swagger
 * /veterinarios:
 *   get:
 *     summary: Listar todos los veterinarios
 *     tags:
 *      - Veterinarios
 *     responses:
 *       '200':
 *         description: Lista de veterinarios obtenida con éxito
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nombre: Veterinario 1
 *               - id: 2
 *                 nombre: Veterinario 2
 */
router.get('/veterinarios', listarVeterinarios);

/**
 * @swagger
 * /recuperar-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     description: Envía un correo electrónico al usuario para restablecer la contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: ejemplo@correo.com
 *     responses:
 *       200:
 *         description: Correo electrónico de recuperación enviado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Correo electrónico de recuperación enviado con éxito.
 *       400:
 *         description: Error de validación o correo electrónico no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Error de validación o correo electrónico no encontrado.
 */
router.post('/recuperar-password',recuperarPassword)

/**
 * @swagger
 * /recuperar-password/{token}:
 *   get:
 *     summary: Verificar token de recuperación de contraseña
 *     description: Verifica la validez del token de recuperación de contraseña.
 *     tags:
 *       - Autenticación
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: Token de recuperación de contraseña.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token válido.
 *         content:
 *           application/json:
 *             example:
 *               message: Token válido.
 *       400:
 *         description: Token no válido o expirado.
 *         content:
 *           application/json:
 *             example:
 *               message: Token no válido o expirado.
 */
router.get('/recuperar-password/:token',comprobarTokenPasword)

/**
 * @swagger
 * /nuevo-password/{token}:
 *   post:
 *     summary: Establecer nuevo password después de recuperación
 *     tags:
 *      - Veterinarios
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               confirmpassword:
 *                 type: string
 *             required:
 *               - password
 *               - confirmpassword
 *     responses:
 *       '200':
 *         description: Password actualizado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Contraseña actualizada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.
 *       '400':
 *         description: Campos incompletos o las contraseñas no coinciden
 *         content:
 *           application/json:
 *             example:
 *               message: Campos incompletos o las contraseñas no coinciden.
 *       '404':
 *         description: Token no válido
 *         content:
 *           application/json:
 *             example:
 *               message: Token de recuperación de contraseña no válido o expirado.
 */
router.post('/nuevo-password/:token',nuevoPassword)

/**
 * @swagger
 * /perfil:
 *   get:
 *     summary: Obtener perfil de usuario autenticado
 *     description: Permite a un usuario autenticado obtener su perfil.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido con éxito.
 *         content:
 *           application/json:
 *             example:
 *               usuario: {
 *                 _id: "5f8a2b3a28e0b51078c295f5",
 *                 nombre: "NombreUsuario",
 *                 email: "usuario@example.com",
 *                 createdAt: "2022-01-01T00:00:00.000Z",
 *                 updatedAt: "2022-01-01T00:00:00.000Z"
 *               }
 *       401:
 *         description: No autorizado. El token de autenticación es inválido o ha expirado.
 *         content:
 *           application/json:
 *             example:
 *               msg: "Token no válido o expirado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               msg: "Error interno del servidor"
 */
router.get('/perfil',verificarAutenticacion,perfil)

/**
 * @swagger
 * /veterinario/actualizarpassword:
 *   put:
 *     summary: Actualizar la contraseña del veterinario autenticado
 *     description: Permite a un veterinario autenticado actualizar su contraseña.
 *     tags:
 *       - Veterinarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passwordActual:
 *                 type: string
 *               nuevaPassword:
 *                 type: string
 *             required:
 *               - passwordActual
 *               - nuevaPassword
 *     responses:
 *       200:
 *         description: Contraseña actualizada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               msg: "Contraseña actualizada correctamente"
 *       401:
 *         description: No autorizado. El token de autenticación es inválido o ha expirado.
 *         content:
 *           application/json:
 *             example:
 *               msg: "Token no válido o expirado"
 *       400:
 *         description: Solicitud incorrecta. La contraseña actual no coincide.
 *         content:
 *           application/json:
 *             example:
 *               msg: "La contraseña actual no es correcta"
 */
router.put('/veterinario/actualizarpassword',verificarAutenticacion,actualizarPassword)

/**
 * @swagger
 * /veterinario/{id}:
 *   get:
 *     summary: Obtener detalles de un veterinario por su ID
 *     description: Permite obtener los detalles de un veterinario específico por su ID.
 *     tags:
 *       - Veterinarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del veterinario a consultar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del veterinario obtenidos con éxito.
 *         content:
 *           application/json:
 *             example:
 *               nombre: "Nombre del Veterinario"
 *               apellido: "Apellido del Veterinario"
 *               direccion: "Direccion del Veterinario"
 *               telefono: "Telefono del Veterinario"
 *               email: "correo@ejemplo.com"
 *               contraseña: "********"
 *       401:
 *         description: No autorizado. El token de autenticación es inválido o ha expirado.
 *         content:
 *           application/json:
 *             example:
 *               msg: "Token no válido o expirado"
 *       404:
 *         description: Veterinario no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               msg: "Veterinario no encontrado"
 */
router.get('/veterinario/:id',verificarAutenticacion,detalleVeterinario)

/**
 * @swagger
 * /veterinario/{id}:
 *   put:
 *     summary: Actualizar el perfil de un veterinario por su ID
 *     description: Permite actualizar el perfil de un veterinario específico por su ID.
 *     tags:
 *       - Veterinarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del veterinario a actualizar.
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
 *               apellido:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *           required:
 *             - nombre
 *             - apellido
 *             - direccion
 *             - telefono
 *             - email
 *             - contraseña
 *     responses:
 *       200:
 *         description: Perfil del veterinario actualizado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               msg: "Perfil del veterinario actualizado correctamente"
 *       404:
 *         description: Veterinario no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               msg: "Veterinario no encontrado"
 *       400:
 *         description: Solicitud incorrecta. Faltan campos requeridos o el formato es incorrecto.
 *         content:
 *           application/json:
 *             example:
 *               msg: "La solicitud es incorrecta, verifica los campos"
 */
router.put('/veterinario/:id',verificarAutenticacion,actualizarPerfil)

/**
 * @swagger
 * components:
 *   schemas:
 *     Veterinario:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         direccion:
 *           type: string
 *         telefono:
 *           type: number
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *         - password
 */

export default router;