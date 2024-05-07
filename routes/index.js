const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');
const EmpleadoValidator = require('../validators/empleadovalidator');

// Ruta para crear un nuevo empleado
router.post('/api/login', async (req, res) => {
    try {
        // Transforma los datos del body en una instancia de la clase Empleado
        const empleado = plainToClass(EmpleadoValidator.Empleado, req.body);
        
        // Valida los datos del empleado
        const errors = await validate(empleado);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // Llama al controlador para crear un nuevo empleado
        const nuevoEmpleado = await empleadosController.createUser(empleado);
        
        // Devuelve el nuevo empleado creado en la respuesta
        return res.status(201).json({ empleado: nuevoEmpleado });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener todos los empleados
router.get('/api/login', async (req, res) => {
    try {
        // Llama al controlador para obtener todos los empleados
        const empleados = await empleadosController.getAllUsers();
        return res.status(200).json({ empleados });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;

