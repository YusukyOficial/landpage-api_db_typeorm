const express = require('express');
const Empresas = require('../models/Empresas');
const Servicos = require('../models/Servicos');
const UsuarioController = require('../controller/UsuarioController');
const ServicoController = require('../controller/ServicoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
 
router.get('/', (req, res) => {
        res.json({
            "status": "API Rodando na porta 3333"
        })
})
// router.get('/', function(req, res) {
//         res.json({
//             "status": "API Rodando na porta 3333"
//         })
// })
router.get('/ping',(req, res) => {
    res.json({
        "pong": "true"
    })
})
router.get('/empresas', (req, res) => {
    res.json({
        "empresas": Empresas
    })
})
// router.get('/servicos', (req, res) => {
//     res.json({
//         "servicos": Servicos
//     })
// })
 
router.post('/servicos', authMiddleware, ServicoController.create);
router.get('/servicos', ServicoController.listar);
 
router.post('/login', UsuarioController.login);
router.post('/usuarios', UsuarioController.register);
router.get('/usuarios', authMiddleware, UsuarioController.listar);
router.get('/usuarios/perfil', authMiddleware, UsuarioController.perfil);
 
module.exports = router;