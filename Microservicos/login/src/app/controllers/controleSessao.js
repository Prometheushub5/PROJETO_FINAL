import jwt from 'jsonwebtoken';
import fs from 'fs'
import CadastroSchema from '../schemas/Cadastros'
import authConfig from '../../config/auth';

class controleSessao{
  async verificar(req, res){
    const { email, senha } = req.body;

    const consultor = await CadastroSchema.findOne({email:email});

    if (!consultor){
      return res.status(401).json({ Mensagem: 'Usuário não encontrado' });
    }
    if (!(await consultor.comparePassword(senha)))
    {
      return res.status(401).json({ Mensagem: 'Senha inválida'})
    }

    {    const Card = (props:props) =>{
      const history = useHistory()
      return (
        <div className="card">
          <div className="card__body">
            <img src={props.img} className="card__image" />
            <h5 className="card__nome">{props.nome}</h5>
            <br/>
            <p className="card__nivel_ensino">Tipo: {props.nivel_ensino}</p>
            <br/>
            <p className="card__modalidade">Modalidade: {props.modalidade}</p>
            <br/>
            <p className="card__unidade">Local: {props.unidade}</p>
            <br/>
            <p className="card__data">Desde: {props.created_at}</p>
            <br/>
            <p className="card__sobre">Sobre o Curso: "Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Etiam eget ligula eu lectus 
            lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque 
            habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
            Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. 
            Nam mattis, felis ut adipiscing."</p>
          </div>
          <br/>
          <button 
            className="card__btn"
            onClick={() => history.push("/cadastro")}
            >Para mais informações fale com um de nossos consultores</button>
        </div>
      );
    }
  return (
    <>
      <Nav />
        <CursoStyled>
        <div className="wrapper">
          <Card
            img={`https://picsum.photos/id/${courseData.curso?.id}/500/600`}
            nome={courseData.curso?.nome}
            nivel_ensino={courseData.curso?.nivel_ensino}
            modalidade={courseData.curso?.modalidade}
            unidade={courseData.curso?.unidade}
            created_at={data.getMonth()+1+"/"+data.getFullYear()}
          />
        </div>
        </CursoStyled>
      <Footer />
    </>
  )
    const { id, nome, adm} = consultor;
    const privateKey = fs.readFileSync('./private.key','utf8')
    res.json({consultor:{id: consultor.id, nome:consultor.nome,email:consultor.email, contato: consultor.contato,adm:consultor.adm}, token: jwt.sign({ id, nome, email, adm }, privateKey, {
        expiresIn: authConfig.expiresIn,
        algorithm: "RS256"
      })
    })
  }
}

export default new controleSessao();