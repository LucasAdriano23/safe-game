const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/db')
const { usuario: obterUsuario } = require('../Query/usuario')

const mutationsUsuario = {
    registrarUsuario(_, { dados }) {
        return mutationsUsuario.novoUsuario(_, {
            dados: {
                nome: dados.nome,
                nomeUsuario:dados.nomeUsuario,
                sobrenome:dados.sobreNome,
                email: dados.email,
                senha: dados.senha,
                cpf: dados.cpf,
                idEmpresa:dados.idEmpresa,
                sexo:dados.sexo,
                tipo_login:dados.tipo_login
            }
        })
    },
    async novoUsuario(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()
        try {
            const idsPerfis = []


            // criptografar a senha
            const salt = bcrypt.genSaltSync()
            dados.senha = bcrypt.hashSync(dados.senha, salt)
            
            const [ id ] = await db('usuario')
                .insert(dados)

            return db('usuario')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirUsuario(_, args, ctx) {
        ctx && ctx.validarAdmin()
        try {
            const usuario = await obterUsuario(_, args)
            if(usuario) {
                const { id } = usuario
                await db('usuarios_perfis')
                    .where({ usuario_id: id }).delete()
                await db('usuarios')
                    .where({ id }).delete()
            }
            return usuario
        } catch(e) {
            throw new Error(e.sqlMessage)
        }

    },
    async alterarUsuario(_, { filtro, dados }, ctx) {
        ctx && ctx.validarUsuarioFiltro(filtro)
        try {
            const usuario = await obterUsuario(_, { filtro })
            if(usuario) {
                const { id } = usuario
                if(ctx.admin && dados.perfis) {
                    await db('usuarios_perfis')
                        .where({ usuario_id: id }).delete()

                    for(let filtro of dados.perfis) {
                        const perfil = await obterPerfil(_, {
                            filtro
                        })
                        
                        if(perfil) {
                            await db('usuarios_perfis')
                                .insert({
                                    perfil_id: perfil.id,
                                    usuario_id: id
                                })
                        }
                    }
                }

                if(dados.senha) {
                    // criptografar a senha
                    const salt = bcrypt.genSaltSync()
                    dados.senha = bcrypt.hashSync(dados.senha, salt)
                }

                await db('usuarios')
                    .where({ id })
                    .update(dados)
            }
            return !usuario ? null : { ...usuario, ...dados }
        } catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = mutationsUsuario