const { IsString, MinLength, MaxLength } = require('class-validator');

class Empleado {
    constructor(nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
    }

    validarNombre() {
        if (typeof this.nombre !== 'string') {
            throw new Error('El nombre debe ser una cadena de caracteres.');
        }

        if (this.nombre.length < 2 || this.nombre.length > 50) {
            throw new Error('El nombre debe tener entre 2 y 50 caracteres.');
        }
    }

    validarContraseña() {
        if (typeof this.contraseña !== 'string') {
            throw new Error('La contraseña debe ser una cadena de caracteres.');
        }

        if (this.contraseña.length < 6 || this.contraseña.length > 20) {
            throw new Error('La contraseña debe tener entre 6 y 20 caracteres.');
        }
    }
}

module.exports = { Empleado };



