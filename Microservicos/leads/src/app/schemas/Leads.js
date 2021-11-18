import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
    nome:{ type: String,required: true},
    cpf:{type:String,required:true},
    email:{type:String,required:true},
    telefone:{type:String, required:true},
    whats:{type:String,required:true},
    curso_id:{type:String, required:true},
    cep:{type:String},
    logradouro:{type:String},
    numero:{type:String},
    bairro:{type:String},
    cidade:{type:String},
    uf:{type:String},
    status:{
        type: String,
        enum:[
            'NOVO',
            'EM_ATENDIMENTO',
            'CONTRATADO',
            'DESISTENTE'
          ],
        default: "NOVO",
        required:false,
    }, 
    consultor_id:{type:String}
},
    {
    timestamps: true,
    }
)

export default mongoose.model('LeadSchema', LeadSchema);