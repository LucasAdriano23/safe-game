const db = require('../../config/db');
const { listarAlternativa } = require('../Query/alternativa');

module.exports = {
    async adicionarAlternativa(_, { dados }){
        try {
            const [ id ] = await db('alternativa')
                .insert({ ...dados })
            return db('alternativa')
                .where({ id }).first().finally(() => db.destroy())
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async excluirAlternativa(_, { filtro }){
        try {
            const alternativa = await listaralternativa(_, { filtro })
            if(alternativa){
                const { id } = alternativa
                await db('alternativa').where({ id }).delete()
            }
            return alternativa
        }catch(e){
            throw new Error(e)
        }
    },
    async alterarAlternativa(_,{ filtro, dados }){
        try {
            const alternativa = await listaralternativa(_,{ filtro })
            if(alternativa){
                const { id } = alternativa
                await db('alternativa').where({ id }).update(dados)
            }
            return {...alternativa, ...dados }
        }catch(e){
            throw new Error(e)
        }
    }
}

