const db = require('../../config/db')

module.exports = {
    async listarPremios(){
        return db('premios')
    },

    async listarPremio(_,{ filtro }){
        if (!filtro) { return null}

        const { id, descPremio } = filtro

        if(id){
            return db('premios')
                .where({ id })
                    .first()
        }else if(descPremio){
            return db('premios')
                .where({ descPremio })
                    .first()
        } else {
            return null
        }
    }
}