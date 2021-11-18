import React, {useEffect, useState, useCallback, FormEvent} from 'react';
import { CursoStyled } from './style';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer'
import useCourse from '../../hooks/useCourse';
import { useHistory, useParams } from 'react-router';
import {api} from '../../services/api'
import { da } from 'date-fns/locale';

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
  unidade:string
}
interface id{
  id:string
}
const EditCurso: React.FC = () => {
  const {id} = useParams<id>()
  const {getCourseData,courseData, updateCourse}=useCourse();
  const [ dadosE, setDadosE ] = useState({});
  const token = localStorage?.getItem('@ServiceToken')

  const def_nivel = [ 
    "LATO SENSU", 
    "FORMAÇÃO COMPLEMENTAR", 
    "GRADUAÇÃO, DOUTORADO", 
    "TÉCNICO, RESIDÊNCIA", 
    "MESTRADO, FUNDAMENTAL", 
    "TÉCNICO INTEGRADO", 
    "MÉDIO", 
    "INFANTIL" 
  ]
  const def_mod = [
     "PRESENCIAL", 
     "SEMI-PRESENCIAL", 
     "REMOTO" 
  ]
  useEffect(()=>{
      getCourseData(id)
    },[id])

    const Card = (props:props) =>{
      return (
        <div className="card">
          <div className="card__body">
          <img src={props.img} className="card__image" />
            <p className="card__nome">Nome:
              <input 
              type="text" 
              placeholder="nome"
              defaultValue= {props.nome}
              onChange={ e => setDadosE(e.target.value)}
              />
            </p>
            <br/>
            <p className="card__nivel_ensino">Tipo: 
            <select
            defaultValue={props.nivel_ensino}   
            onChange={e => setDadosE({...dadosE, nivel_ensino: e.target.value})}
            placeholder="" 
          >
            {def_nivel.map(nivel => (
            <option key={nivel} value={nivel}>
            {nivel}
              </option>
              ))}
          </select>
            </p>
            <br/>
            <p className="card__modalidade">Modalidade:
            
              <select
              defaultValue={props.modalidade}   
              onChange={e => setDadosE({...dadosE, modalidade: e.target.value})}
              placeholder="" 
            >
              {def_mod.map(modalidade => (
              <option key={modalidade} value={modalidade}>
              {modalidade}
                </option>
                ))}
              </select>
            </p>
            <br/>
            <p className="card__unidade">Local: 
            <input 
              type="text" 
              placeholder="unidade"
              defaultValue={props.unidade}
              onChange={ e => setDadosE({...dadosE, unidade: e.target.value})}
              />
              </p>
            <br/>
            <button 
          className="card__btn"
        onClick={() => {updateCourse(token||"q",id,dadosE)
        console.log(dadosE)}}
          >Atualizar!</button>
          </div>
          <br/>
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
            />
          </div>
          </CursoStyled>
        <Footer />
      </>
    )
}
export default EditCurso;

