const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUsuarioLogado } = require('../comum/usuario')

module.exports = {
    async login(_, { dados }) {
        const usuario = await db('usuarios')
            .where({ cpf: dados.cpf })
            .first()

        if(!usuario) {
            throw new Error('Usuário/Senha inválido')
        }

        const saoIguais = bcrypt.compareSync(dados.senha,
            usuario.senha)

        if(!saoIguais) {
            throw new Error('Usuário/Senha inválido')
        }

        return getUsuarioLogado(usuario)
    },
    listarUsuarios(parent, args) {
        // ctx && ctx.validarAdmin()
        return db('usuario')
    },
    listarUsuario(_, { filtro }, ctx) {
        ctx && ctx.validarUsuarioFiltro(filtro)
        
        if(!filtro) return null
        const { id, email } = filtro
        if(id) {
            return db('usuario')
                .where({ id })
                .first()
        } else if(email) {
            return db('usuario')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}