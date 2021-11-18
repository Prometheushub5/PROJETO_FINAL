import mongoose from "mongoose";

const Cursos = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    enum: [
      'EDUCACAO_BASICA',
      'GRADUACAO',
      'POS_GRADUACAO',
      'EDUCACAO_DISTANCIA'
      ],
    required: true
  },
  grau_academico:{
    type: String,
    enum:[
      'BACHARELADO',
      'LICENCIATURA',
      'TECNOLÓGICO',
      'MBA',
      'LATO_SENSU',
      'STRICTO_SENSU'
    ],
    required:true,
     },
  modalidade:{
    type: String,
    enum: [
      'PRESENCIAL',
      'SEMI-PRESENCIAL',
      'REMOTO'],
    required: true,
  },
  unidade: {
    type: String,
    required: false,
  },
  consultor_id:{
    type: String,
    required: true
  },
  descricao_id:{
    type: String,
    required: false
  },
  imagem_id:{
    type: String,
    required: false
 }
}, {
  timestamps: true,
})

export default mongoose.model('Cursos', Cursos);