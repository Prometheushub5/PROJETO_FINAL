import CadastroSchema from "../schemas/Cadastros";
import * as Yup from 'yup';

class ControleCadastro{
    async criar(req,res){
      const modelo = Yup.object().shape({
        nome: Yup.string().required(),
        email: Yup.string().email().required(),
        adm: Yup.boolean(),
        contato: Yup.string().required(),
        senha: Yup.string().required()
      })
      if (!(await modelo.isValid(req.body))){
        return res.status(400).json({Mensagem:"Solicitação inválida."})
      }
        const ExisteCadastro = await CadastroSchema.findOne({email:req.body.email})
        if (ExisteCadastro){
            return res.status(422).json({
                error: 'E-mail já cadastrado'
            })
        }
        const novocadastro = await CadastroSchema.create(req.body);
        return res.status(200).json({Mensagem: "Consultor Criado",consultor: novocadastro});
    }
    async update(req, res) {
        const modelo = Yup.object().shape({
          nome: Yup.string(),
          contato: Yup.string(),
          email: Yup.string().email(),
          senhaAntiga: Yup.string(),
          senha: Yup.string().when(
            'senhaAntiga', (senhaAntiga, entrada) => senhaAntiga ? entrada.required() : entrada
          ),
          senhaConfirma: Yup.string().when(
            'senha', (senha, entrada) => senha ? entrada.required().oneOf([Yup.ref('senha')]) : entrada)
        });
    
        if (!(await modelo.isValid(req.body))){
          return res.status(400).json({Mensagem:"Solicitação inválida."})
        }
        const { email, senhaAntiga } = await req.body;
    
        const consultor = await CadastroSchema.findById(req.consultorID);
    
        if ( email && email !== consultor.email){
          const e_mail_usado = await CadastroSchema.findOne({email:email})
          if(e_mail_usado){
            return res.status(422).json({ mensagem: 'Esse email já esta em uso!'})
          }
        }
    
        if( senhaAntiga && !(await consultor.comparePassword(senhaAntiga))) {
          return res.status(401).json({ Mensagem: 'A senha não confere'})
        }
        const atualizado = await CadastroSchema.findByIdAndUpdate(req.consultorID,req.body,{new: true});
        const {nome: novo_nome, email: novo_email, contato: novo_contato } = atualizado
        return res.status(200).json({mensagem:"Update com sucesso","me":{nome:novo_nome,email:novo_email,contato:novo_contato}});
      }
    // async delete(req, res){
    //     const {id} = req.params
    //     const consultor = await CadastroSchema.findByPk(id);   
    //     if (consultor){
    //       const del = await curso.destroy(cliente);
    //         return res.status(200).json({Mensagem: 'Excluido!'})
    //       }
    //       return res.status(404).json({ Mensagem: 'ID não existe'})
    //     }
}

export default new ControleCadastro();