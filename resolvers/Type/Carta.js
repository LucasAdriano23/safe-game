const db = require('../../config/db')

module.exports = {
    alternativas(carta) {
        return db('alternativa')
            .join(
                'carta',
                'alternativa.idCarta',
                'carta.id'
            )
            .where({ idCarta: carta.id })
    }
}