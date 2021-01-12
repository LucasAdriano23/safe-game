const db = require('../../config/db');
const { listarRespostaUsuario } = require('../Query/respostaUsuario');

module.exports = {
    async adicionarRespostaUsuario(_, { dados }){
        try {
            const [ id ] = await db('respostaUsuario')
                .insert({ ...dados })
            return db('respostaUsuario')
                .where({ id }).first().finally(() => db.destroy())
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async excluirRespostaUsuario(_, { filtro }){
        try {
            const RespostaUsuario = await listarRespostaUsuario(_, { filtro })
            if(RespostaUsuario){
                const { id } = RespostaUsuario
                await db('respostaUsuario').where({ id }).delete()
            }
            return RespostaUsuario
        }catch(e){
            throw new Error(e)
        }
    },
    async alterarRespostaUsuario(_,{ filtro, dados }){
        try {
            const RespostaUsuario = await listarRespostaUsuario(_,{ filtro })
            if(RespostaUsuario){
                const { id } = RespostaUsuario
                await db('respostaUsuario').where({ id }).update(dados)
            }
            return {...RespostaUsuario, ...dados }
        }catch(e){
            throw new Error(e)
        }
    }
}

