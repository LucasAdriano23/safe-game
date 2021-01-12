const db = require('../../config/db')

module.exports = {
    usuarios(empresa) {
        return db('usuario')
            .join(
                'empresa',
                'usuario.idEmpresa',
                'empresa.id'
            )
            .where({ idEmpresa: empresa.id })
    }
}