const express = require('express');
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

<<<<<<< HEAD
// Ruta para el inicio de sesión
app.post('/api/login', (req, res) => {
    // Aquí iría la lógica para verificar las credenciales del usuario
    const { username, password } = req.body;
=======
const PORT = process.env.PORT || 8080;
>>>>>>> 7b73e855fd83db14c3c027ad4a2cc8780653850e

    // Por ahora, solo devolvemos un mensaje de éxito
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

