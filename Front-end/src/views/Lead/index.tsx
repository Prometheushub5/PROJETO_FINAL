import React, {useEffect, useState} from 'react';
import { CursoStyled } from './style';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer'
import useCourse from '../../hooks/useCourse';
import {useParams} from 'react-router';
import useLeads from '../../hooks/useLeads';
import useConsultant from '../../hooks/useConsultant';



interface id{
  id:string
}
const Lead: React.FC = () => {
  const token: string = localStorage?.getItem('@ServiceToken')||"";
  const {id} = useParams<id>()
  const {lead,getLead,updateLead}=useLeads();
  const {consultant,getConsultant}=useConsultant()
  const {getCourseData,courseData}=useCourse();
  useEffect(()=>{
      getLead(token,id)
    },[id])

  useEffect(()=>{
    getCourseData(lead.cliente?.curso_id)
    },[lead.cliente?.curso_id])

  useEffect(()=>{
      getConsultant(token,lead?.cliente?.consultor_id)
    },[lead.cliente?.consultor_id])

  const [status,setStatus] = useState<string>(lead.cliente?.status);
  const def_status = [
    "NOVO",
    "EM_ATENDIMENTO",
    "CONTRATADO",
    "DESISTENTE"
  ]
  return (
    <>
      <Nav />
        <CursoStyled>
        <div className="wrapper">
        <div className="card">
        <div className="card__body">
        <h4>Cliente</h4>
        <br/>
          <h5 className="card__nome">{lead.cliente?.nome}</h5>
          <br/>
          <h4>Dados Pessoais</h4>
          <br/>
          <p className="card__cpf">CPF: {lead.cliente?.cpf}</p>
          <p className="card__email">E-mail: {lead.cliente?.email}</p>
          <p className="card__telefone">Telefone: {lead.cliente?.telefone}</p>
          <p className="card__whats">WhatsApp: {lead.cliente?.whats}</p>
          <br/>
          <h4>Endereço</h4><br/>
          <p className="card__endereço">
            {lead.cliente?.logradouro}, 
            N° {lead.cliente?.numero}</p>
            <p>{lead.cliente?.bairro}</p>
            <p>{lead.cliente?.cidade}/{lead.cliente?.uf}</p>
            <p>{lead.cliente?.cep}</p>
          <h4 className="card__curso">Curso</h4><br/>
          <p>{courseData.curso?.nome}</p>
          <p className="card__nivel_ensino">Tipo: {courseData.curso?.nivel_ensino}</p>
          <p className="card__modalidade">Modalidade: {courseData.curso?.modalidade}</p>
          <p className="card__unidade">Local: {courseData.curso?.unidade}</p>
        </div>
        <br />
        <h4>Status de Atendimento</h4>
        <p>Consultor Atual: {consultant.consultor?.nome}</p>
        <p>Status Atual: {lead.cliente?.status}</p>

          <select
            defaultValue={lead.cliente?.status}   
            onChange={e => setStatus(e.target.value)}
            placeholder="" 
          >
            {def_status.map(status => (
            <option key={status} value={status}>
            {status}
              </option>
              ))}
          </select>
        <br/>
        <button 
          className="card__btn"
        onClick={() => updateLead(token,id,status)}
          >Atualizar status de atendimento!</button>
      </div>
        </div>
        </CursoStyled>
      <Footer />
    </>
  );

  }
export default Lead;