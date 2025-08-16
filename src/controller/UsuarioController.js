// metodos funcoes o que faz acoes
// Com banco de dados
const AppDataSource = require('../database/database');
const Usuario = require('../app/Entities/Usuario');
const usuarioRepository = AppDataSource.getRepository(Usuario);

// Quando era vetor
const Usuarios = require("../models/Usuarios");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'S3CR3TK3Y';
const UsuarioController = {
    login: async (req, res) => {
        const { email, senha } = req.body;
        // validar se os dados nao estao nulos 
        if(!email || !senha) {
            return res.status(400).json({erro: 'Email e senha sao obrigatorios.'})
        }
        // busca o usuario pelo email
        // const usuario = Usuarios.find(user => user.email === email);
        const usuario = await usuarioRepository.findOne({ where: {email} });
        // valida se encontrou um usuario pelo email
        if(!usuario) {
            return res.status(401).json({ erro: 'Credenciais inválidas'})
        }
        // match | comparar senha enviada com a senha armazenada
        // const senhaValida = usuario.senha === senha;
        const senhaValida = bcrypt.compareSync(senha, usuario.senha)
        if(!senhaValida) {
            return res.status(401).json({ erro: 'Credenciais invalidas'})
        }
        const token = jwt.sign( //jwt importar la em cima const jwt = require('jsonwebtoken')
            {id: usuario.id, nome: usuario.nome},
            SECRET_KEY, //SECRET_KEY criar la em cima abaixo dos imports const SECRET_KEY = 'S3CR3TK3Y'
            {expiresIn: '1h'}
        )
        // return res.status(201).json(usuario)
        return res.json(token)
    },
    register: async (req, res) => {
        const {nome, email, senha} = req.body;
        if(!email || !senha || !nome) {
            return res.status(400).json({erro: "preencha os campos obrigatorios"})
        }
        // const usuario = Usuarios.find(user => user.email === email);
        const emailExistente = await usuarioRepository.findOne({ where: {email}});
        // if(usuario) {

        if(emailExistente) {
            return res.status(400).json({erro: "Este email ja esta sendo utilizado"})
        }
        const salt = bcrypt.genSaltSync(10);
        const senhaHash = bcrypt.hashSync(senha, salt);

        // const novoId = Usuarios.length > 0 ? Usuarios[Usuarios.length - 1].id + 1 : 1

        const novoUsuario = {
            // id: novoId,
            nome,
            email,
            senha: senhaHash,
            // created_at: new Date(),
            // updated_at: new Date()
        }
        // Usuarios.push(novoUsuario);
        const usuarioSalvo = await usuarioRepository.save(novoUsuario); 


        const { senha:_, ...usuarioContext} = usuarioSalvo;


        return res.status(201).json({
            mensagem: "Usuario registrado com sucesso",
            data: usuarioContext
        })
    },
    listar: (req, res) => {
        return res.status(200).json(Usuarios);
    },
    perfil: async (req, res) => {
        const usuarioAuthId = req.usuarioId;
        // const usuario = Usuarios.find(user => user.id === usuarioAuthId);
        const usuario =  await usuarioRepository.findOneBy({ id: usuarioAuthId });
        if(!usuario) {
            return res.status(404).json(
                { erro: 'Usuario nao encontrado'})
        }
        const { senha: _, ...perfilData} = usuario;
        
        return res.status(200).json(perfilData);
    }
}

module.exports = UsuarioController;