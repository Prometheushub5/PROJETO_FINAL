import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const CadastroSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    adm:{
        type: Boolean,
        default: false,
    },
    contato:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },

});
CadastroSchema.pre('save',function(next){
    const cadastro = this;
    if(!cadastro.isModified('senha')) return next();
    bcrypt.hash(cadastro.senha,10,function(err, hash) {
        if (err) return next(err);
    cadastro.senha=hash
    next();
})
});
CadastroSchema.methods.comparePassword= function (candidatePassword){
         return bcrypt.compare(candidatePassword, this.senha)
    }
export default mongoose.model('CadastroSchema', CadastroSchema);