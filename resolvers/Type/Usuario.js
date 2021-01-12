const db = require('../../config/db')

module.exports = {
    idEmpresa(usuario) {
        return db('empresa')
            .join(
                'empresa',
                'empresa.id',
                '=',
                'usuario.idEmpresa'
            )
            .where({ id: usuario.idEmpresa })
    }
}