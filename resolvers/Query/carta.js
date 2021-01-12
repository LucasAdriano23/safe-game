const db = require('../../config/db')

module.exports = {
    async listarCartas(){
        return db('carta')
    },

    async listarCarta(_,{ filtro }){
        if (!filtro) { return null}

        const { id,idAlternativaCerta } = filtro

        if(id){
            return db('carta')
                .where({ id })
                    .first()
        }else if(idAlternativaCerta){
            return db('carta')
            .where({ idAlternativaCerta })
                .first()
        } else {
            return null
        }
    },
}