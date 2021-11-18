require ('dotenv/config')
import Curso from "../schemas/Cursos";
import * as Yup from 'yup';
import fileServer from "./fileServer";

class ControleCurso{
    async criar(req,res){
      const modelo = Yup.object().shape({
        nome: Yup.string().required(),
        categoria:Yup.string().required().oneOf([
          'EDUCACAO_BASICA',
          'GRADUACAO',
          'POS_GRADUACAO',
          'EDUCACAO_DISTANCIA'
          ]),
        grau_academico:Yup.string().oneOf([
          'BACHARELADO',
          'LICENCIATURA',
          'TECNOLÓGICO',
          'MBA',
          'LATO_SENSU',
          'STRICTO_SENSU'
        ]),
        modalidade:Yup.string().required().oneOf([
            'PRESENCIAL',
            'SEMI-PRESENCIAL',
            'REMOTO'
          ]).required(),
        unidade: Yup.string().required()
        });
        if (!(await modelo.isValid(req.body))){
          return res.status(400).json({Mensagem:"Solicitação inválida."})
        };
        const authHeaders = req.headers.authorization;
        const [, token] = authHeaders.split(' ');
        const novocurso = Object.assign({}, req.body);
        novocurso.consultor_id = req.consultorID;
        const curso = await Curso.create (novocurso);
        const ids = await fileServer.upload(
          process.env.URLFILESERVER,token, await fileServer.tmphold(req)
          );
        novocurso.descricao_id=ids.descricao
        novocurso.imagem_id=ids.imagem
        const cursoplus = await Curso.findByIdAndUpdate(curso.id,novocurso,{new: true});
        return res.status(200).json(cursoplus);
    }
    async listar(req, res){
      const {id} = req.params
      if(id){ 
          const curso = await Curso.findOne({_id:id});
      if(curso){
          return res.status(200).json({curso: curso});
      }
      return res.status(404).json({
        Mensagem:"Recurso inexistente!."});
    }
    const modelo = Yup.object().shape({
      limit: Yup.number().max(100),
      page: Yup.number()
    })
    if (!(await modelo.isValid(req.query))){
      return res.status(400).json({Mensagem:"Solicitação inválida."})
    }
      const { limit=3, page = 1} = req.query;
      const cursos = await Curso.find()
        .select(['nome','categoria'])
        .sort({nome:"asc"})
        .limit(parseInt(limit))
        .skip((page-1) * limit)
      return res.status(200).json({pagina:page,cursos});
    }
    async update(req, res){
    const modelo = Yup.object().shape({
        nome: Yup.string(),
        categoria:Yup.string().oneOf([
          'EDUCACAO_BASICA',
          'GRADUACAO',
          'POS_GRADUACAO',
          'EDUCACAO_DISTANCIA'
          ]),
        grau_academico:Yup.string().oneOf([
          'BACHARELADO',
          'LICENCIATURA',
          'TECNOLÓGICO',
          'MBA',
          'LATO_SENSU',
          'STRICTO_SENSU'
        ]),
        modalidade:Yup.string().oneOf([
            'PRESENCIAL',
            'SEMI-PRESENCIAL',
            'REMOTO'
          ]),
        unidade: Yup.string()
        });

    if (!(await modelo.isValid(req.body))){
      return res.status(400).json({Mensagem:"Solicitação inválida."})
    }
    const {id} = req.params
    const atualizacao = Object.assign({}, req.body);
    atualizacao.consultor_id = req.consultorID;
    try{
    const curso = await Curso.findByIdAndUpdate(id,atualizacao,{new: true});
        return res.status(200).json(curso)
      }
      catch(err){
      return res.status(404).json({ Mensagem: 'ID não existe'})
    }}
    async delete(req, res){
    const {id} = req.params
    try{
    const curso = await Curso.findByIdAndDelete(id);
    return res.status(200).json({Mensagem: 'Curso excluido',curso})
      }
      catch(err){
      return res.status(404).json({ Mensagem: 'ID não existe'})
      }
    }
  }
export default new ControleCurso();