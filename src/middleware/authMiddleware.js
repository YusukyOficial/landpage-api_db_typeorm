const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');
const SECRET_KEY = 'S3CR3TK3Y';

const AppDataSource = require('../database/database');
const Usuario = require('../app/Entities/Usuario');
const usuarioRepository = AppDataSource.getRepository(Usuario);

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({erro: 'Header authorization nao encontrado'})
    }
    // estrategia de autorizacao usando "Bearer TOKEN"
    const parts = authHeader.split(' ');
    console.log(parts)
    if(parts.length !== 2) {
        return res.status(401).json({ erro: 'Token com formato invalido'})
    }
    const [scheme, token] = parts;

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if(err) {
            return res.status(401).json({erro: 'Token invalido ou expirado.'})
        }
        // const usuario = Usuarios.find(user => user.id === decoded.id);
        const usuario = await usuarioRepository.findOneBy({ id: decoded.id });
        if(!usuario) {
            return res.status(401).json({ erro: 'usuario do token nao encontrado'})
        }
        req.usuarioId = usuario.id;

        return next();
    } )
}

module.exports = authMiddleware;