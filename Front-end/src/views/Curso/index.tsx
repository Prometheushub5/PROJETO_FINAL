import React, {useEffect, useState, useCallback, FormEvent} from 'react';
import { CursoStyled } from './style';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer'
import useCourse from '../../hooks/useCourse';
import { useHistory, useParams } from 'react-router';

interface Curso {
  nome: string;
  nivel_ensino: string;
  grau_academico: string;
  modalidade: string;
  unidade: string;
}
type props={
  img:string,
  nome:string,
  nivel_ensino:string,
  modalidade:string,
  unidade:string,
  created_at: string
}
interface id{
  id:string
}
const Curso: React.FC = () => {
  const {id} = useParams<id>()
  const {getCourseData,courseData}=useCourse();

  useEffect(()=>{
      getCourseData(id)
    },[id])
  const date = new Date(courseData.curso?.created_at)

  const Card = (props:props) =>{
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
          created_at={date.getMonth()+1+"/"+date.getFullYear()}
        />
      </div>
      </CursoStyled>
    <Footer />
  </>
)
  }
export default Curso;