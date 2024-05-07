const { validate } = require('class-validator');
const models = require("../database/models");
const bcrypt = require('bcrypt');

const iniciarSesion = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Busca el usuario en la base de datos por su nombre de usuario
        const usuario = await models.empleados.findOne({ where: { username } });

        // Si no se encuentra el usuario, devuelve un error de usuario no encontrado
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no registrado" });
        }

        // Comprueba si la contraseña es correcta
        const contraseñaValida = await bcrypt.compare(password, usuario.password);
        if (!contraseñaValida) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Si la autenticación es exitosa, devuelve un mensaje de éxito y los datos del usuario
        return res.status(200).json({ message: "Inicio de sesión exitoso", usuario });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    iniciarSesion
};


