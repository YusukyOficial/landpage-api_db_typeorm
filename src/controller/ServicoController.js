// metodos funcoes o que faz acoes
// Com banco de dados
const AppDataSource = require('../database/database');
const Servico = require('../app/Entities/Usuario');
const servicoRepository = AppDataSource.getRepository(Servico);
 
// Quando era vetor
const Usuarios = require("../models/Usuarios");
 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'S3CR3TK3Y';
const ServicoController = {
 
 
    creat: async (req, res) => {
        const {nome, descricao, valor, img_url} = req.body;
        if(!nome) {
            return res.status(400).json({erro: "preencha os campos obrigatorios"})
        }
 
        const novoServico = {
            // id: novoId,
            nome,
            descricao,
            valor,
            img_url,
        }  
        const ServicoSalvo = await servicoRepository.save(novoServico);
        return res.status(201).json({
            mensagem: "Serviço registrado com sucesso",
            data: servicoContext
        })
    },
    listar: (req, res) => {
        return res.status(200).json(Servico);
    },
    perfil: async (req, res) => {
        const servicoAuthId = req.servicoId;
        const servico = await servicoRepository.findOneBy({id: servicoAuthId});
        if(!servico) {
            return res.status(404).json(
                { erro: 'Serviço nao encontrado'})
        }
        const { senha: _, ...perfilData} = usuario;
       
        return res.status(200).json(perfilData);
    }
}
 
module.exports = ServicoController;