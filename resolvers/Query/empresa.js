const db = require('../../config/db')

module.exports = {
     listarEmpresas(){
        return db('empresa')
    },

     listarEmpresa(_,{ filtro }){
        if (!filtro) { return null}

        const { id, nomeEmpresa } = filtro
        
        if(id){
            return db('empresa')
                .where({ id })
                    .first()
        }else if(nomeEmpresa){
            return db('empresa')
                .where({ nomeEmpresa })
                    .first()
        } else {
            return null
        }
    }
}