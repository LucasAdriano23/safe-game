const db = require('../../config/db');
const { listarPremios } = require('../Query/premios');

module.exports = {
    async adicionarPremios(_, { dados }){
        try {
            const [ id ] = await db('premios')
                .insert({ ...dados })
            return db('premios')
                .where({ id }).first()
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async excluirPremios(_, { filtro }){
        try {
            const premios = await listarPremios(_, { filtro })
            if(premios){
                const { id } = premios
                await db('premios').where({ id }).delete()
            }
            return premios
        }catch(e){
            throw new Error(e)
        }
    },
    async alterarPremios(_,{ filtro, dados }){
        try {
            const premios = await listarPremios(_,{ filtro })
            if(premios){
                const { id } = premios
                await db('Premios').where({ id }).update(dados)
            }
            return {...premios, ...dados }
        }catch(e){
            throw new Error(e)
        }
    }
}

