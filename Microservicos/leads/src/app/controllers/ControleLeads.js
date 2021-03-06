import LeadSchema from '../schemas/Leads'
import * as Yup from 'yup';

class ControleLeads{
    async criar(req,res){
        const modelo = Yup.object().shape({
            nome: Yup.string().required(),
            cpf: Yup.string().required(),
            email: Yup.string().email().required(),
            telefone: Yup.string().required(),
            whats:Yup.string().required(),
            curso_id: Yup.string().required(),
            cep: Yup.string(),
            logradouro: Yup.string(),
            numero: Yup.string(),
            bairro: Yup.string(),
            cidade: Yup.string(),
            uf: Yup.string(),
        });      
          if (!(await modelo.isValid(req.body))){
            return res.status(400).json({ 
                Mensagem:"Solicitação inválida."})
          }
        const ExisteLead = await LeadSchema.find({$or: [
            { 'email': req.body.email},
            { 'cpf': req.body.cpf }
          ]})
        if (Object.keys(ExisteLead).length === 0){
            const cliente = await LeadSchema.create(req.body);
        return res.status(200).json(cliente);         
        }
        return res.status(422).json({
            Mensagem: 'Cliente já cadastrado'
        })
    }
    // async listar(req, res){
    //     const {id} = req.params
    //     if(id){ 
    //         const cliente = await Clientes.findOne({
    //         where: {id:id}
    //     });
    //     if(cliente){
    //         return res.status(200).json({cliente: cliente});
    //     }
    //     return res.status(400).json({
    //         Mensagem:"Solicitação inválida."});
    // }
    // const modelo = Yup.object().shape({
    //     limit: Yup.number().max(100),
    //     status: Yup.string().oneOf([
    //         'NOVO',
    //         'EM_ATENDIMENTO',
    //         'CONTRATADO',
    //         'DESISTENTE'
    //     ]),
    //     page: Yup.number()
    //   })
    //   if (!(await modelo.isValid(req.query))){
    //     return res.status(400).json({Mensagem:"Solicitação inválida."})
    //   }
    //     const { limit = 3, page = 1, status} = req.query;
    //     if(status){
    //             const clientes = await Clientes.findAll({
    //                 where: {status: status},
    //                 order : ['updated_at'],
    //                 attributes: ['id','nome',['updated_at', 'atualizado']],
    //                 limit: limit,
    //                 offset: (page -1) * limit
    //             })
    //             return res.status(200).json({status : status, pagina: page, clientes: clientes})
    //     }
    //     const clientes = await Clientes.findAll({
    //         order : ['updated_at'],
    //         attributes: ['id','nome','status'],
    //         limit: limit,
    //         offset: (page -1) * limit,

    //     });
    //     return res.status(200).json({pagina: page, clientes: clientes});
    // }
    // async atendimento(req, res){
    //     const modelo = Yup.object().shape({
    //         status: Yup.string().required().oneOf([
    //         'EM_ATENDIMENTO',
    //         'CONTRATADO',
    //         'DESISTENTE'
    //     ])
    //       });      
    //       if (!(await modelo.isValid(req.body))){
    //         return res.status(400).json({Mensagem:"Solicitação inválida."})
    //       }
    //     const dados = Object.assign({}, req.body);
    //     const {id} = req.params
    //     dados.consultor_id = req.consultorID;
    //     const consultor = await Consultores.findByPk(req.consultorID);
    //     const cliente = await Clientes.findByPk(id);
    //     if(cliente){
    //         const novo_status = await cliente.update(dados);
    //         return res.status(200).json({nome:cliente.nome, id: cliente.id, consultor: consultor.nome, status:cliente.status});
    //     }
    //     return res.status(400).json({
    //         Mensagem:"Solicitação inválida."});
    // }
    // async delete(req, res){
    //     const {id} = req.params
    //     const cliente = await Clientes.findByPk(id);   
    //     if (cliente){
    //       const del = await curso.destroy(cliente);
    //         return res.status(200).json({Mensagem: 'Curso excluido'})
    //       }
    //       return res.status(404).json({ Mensagem: 'ID não existe'})
    //  }
}

export default new ControleLeads();