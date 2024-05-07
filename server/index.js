const cors = require('cors');
const express = require('express');
const routes = require('../routes');

const server = express();
server.use(cors());
server.options('*', cors());

server.use(express.json());

server.use('/api/empleados', routes); // Monta las rutas bajo /api/empleados

module.exports = server;
