import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import useLeads from "../../hooks/useLeads";
import usePagination from "../../hooks/usePagination";
import { StyledLead } from "./style";


const Leads: React.FC = ()=>{
  const token: string | null = localStorage.getItem('@ServiceToken');
  const history = useHistory();
  const [status,setStatus]=useState<string>()
  const {actualPage,setActualPage}=usePagination()
  const{leads,getLeads}=useLeads();
  useEffect(()=>{
    if(typeof token === "string"){
    getLeads(token,8,actualPage,status)
    }
  },[status,actualPage])
  const def_status = [
    "",
    "NOVO",
    "EM_ATENDIMENTO",
    "CONTRATADO",
    "DESISTENTE"
  ]

  return(
    <>
      <Nav/>
      <StyledLead>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th><select
                    onChange={e => setStatus(e.target.value)}
                    placeholder="" 
                  >
                    {def_status.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select></th>
                    <th>Atualizado em: </th>
                </tr>
            </thead>
            <tbody className="table_body">
                {leads.clientes?.map(cliente =>(              
                    <tr 
                    key={cliente.id}
                    onClick={() => history.push("/lead/"+cliente.id)}
                    >                   
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.status}</td>
                    <td>{new Date(cliente.atualizado).toDateString()}</td>
                </tr>
                ))}                
                               
            </tbody>
        </table>
         <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div style={{justifyContent: 'flex-start'}}>
            <button key ="Proximo" onClick={()=> setActualPage(actualPage-1)}>
              Anterior
            </button>
          </div>
          <div style={{justifyContent: 'flex-end'}}>
            <button key ="Proximo" onClick={()=> setActualPage(actualPage+1)}>
              Próximo
            </button>
          </div>
        </div>
      </StyledLead>
      <Footer/>
    </>
  )
}


export default Leads