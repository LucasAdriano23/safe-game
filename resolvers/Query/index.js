const usuario = require('./usuario')
const empresa = require('./empresa')
const carta = require('./carta')
const premios = require('./premios')
const respostaUsuario = require('./respostaUsuario')
const alternativa = require('./alternativa')

 module.exports = {
    ...usuario,
    ...empresa,
    ...premios,
    ...carta,
    ...respostaUsuario,
    ...alternativa
 }