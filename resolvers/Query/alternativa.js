const db = require('../../config/db')

module.exports = {
     listarAlternativas(){
        return db('alternativa')
    },

    listarAlternativa(_,{ filtro }){
        if (!filtro) { return null}

        const { id, idCarta } = filtro

        if(id){
            return db('alternativa')
                .where({ id })
                    .first()
        }else if(idCarta){
            return db('alternativa')
                .where({ idCarta })
                    .first()
        } else {
            return null
        }
    }
}