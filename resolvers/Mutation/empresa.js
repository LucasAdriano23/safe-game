const db = require('../../config/db');
const { listarEmpresa } = require('../Query/empresa');

module.exports = {
    async adicionarEmpresa(_, { dados }){
        try {
            const [ id ] = await db('empresa')
                .insert({ ...dados })
            return db('empresa')
                .where({ id }).first().finally(() => db.destroy())
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async excluirEmpresa(_, { filtro }){
        try {
            const empresa = await listarEmpresa(_, { filtro })
            if(empresa){
                const { id } = empresa
                await db('usuario').where({idEmpresa: id}).delete()
                await db('premios').where({idEmpresa:id}).delete()
                await db('empresa').where({ id }).delete()
            }
            return empresa
        }catch(e){
            throw new Error(e)
        }
    },
    async alterarEmpresa(_,{ filtro, dados }){
        try {
            const empresa = await listarEmpresa(_,{ filtro })
            if(empresa){
                const { id } = empresa
                await db('empresa').where({ id }).update(dados)
            }
            return {...empresa, ...dados }
        }catch(e){
            throw new Error(e)
        }
    }
}

