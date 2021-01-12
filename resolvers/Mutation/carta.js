const db = require('../../config/db');
const { listarCarta } = require('../Query/carta');

module.exports = {
    async adicionarCarta(_, { dados }){
        try {
            const [ id ] = await db('carta')
                .insert({ ...dados })
            return db('carta')
                .where({ id }).first().finally(() => db.destroy())
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async excluirCarta(_, { filtro }){
        try {
            const carta = await listarCarta(_, { filtro })
            if(carta){
                const { id } = carta
                await db('carta').where({ id }).delete()
            }
            return carta
        }catch(e){
            throw new Error(e)
        }
    },
    async alterarCarta(_,{ filtro, dados }){
        try {
            const carta = await listarCarta(_,{ filtro })
            if(carta){
                const { id } = carta
                await db('carta').where({ id }).update(dados)
            }
            return {...carta, ...dados }
        }catch(e){
            throw new Error(e)
        }
    }
}