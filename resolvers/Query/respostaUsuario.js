module.exports = {
    async listarRespostaUsuario(){
        return db('respostaUsuario')
    },

    async listarRespostaUsuario(_,{ filtro }){
        if (!filtro) { return null}

        const { id, idUsuario,idCarta,idAlternativaMarcada,data_criacao } = filtro

        if(id){
            return db('respostaUsuario')
                .where({ id })
                    .first()
        }else if(idAlternativaCerta){
            return db('respostaUsuario')
            .where({ idAlternativaCerta })
                .first()
        } else {
            return null
        }
    },
}