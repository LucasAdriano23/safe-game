const usuario = require('./usuario')
const empresa = require('./empresa')
const carta = require('./carta')
const premios = require('./premios')
const respostaUsuario = ('./respostaUsuario')
const alternativa = ('./alternativa')

 module.exports = {
    ...usuario,
    ...empresa,
    ...carta,
    ...premios,
    // ...respostaUsuario
   //  ...alternativa

 }