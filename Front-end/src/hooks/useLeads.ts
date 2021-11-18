import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface Clientes {
    id: number;
    nome: string;
    status: string;
    atualizado: Date;
}

interface Leads {
    pagina: number;
    clientes: Clientes[];
}

interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro?: any;
    cidade: string;
    uf: string;
    email: string;
    telefone: string;
    whats: string;
    curso_id: string;
    consultor_id: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface Lead{
    cliente: Cliente;
}
export default function useLeads(){
    const [leads,setLeads]=useState<Leads>({} as Leads);
    const [lead,setLead]=useState<Lead>({}as Lead)
    function getLeads(token:string, pageLimit:number, page:number, status?:string){
      if(typeof status === "string"&& status !==""){
      api({
            method: "GET",
            url:`clientes?limit=${pageLimit}&page=${page}&status=${status}`,
            headers:{
                'authorization': 'Bearer '+token,
            }
      })
        .then((response) => setLeads(response.data))
        .catch( e => { toast.error('Oops, algo deu errado')}) 
      }
        else 
            api({
                method: "GET",
                url:`clientes?limit=${pageLimit}&page=${page}`,
                headers:{
                    'authorization': 'Bearer '+token,
                }
            })
                .then((response) => setLeads(response.data))
                .catch( e => { toast.error('Oops, algo deu errado')}) 
    }
    function getLead(token:string,id:string){
        api({
          method: "GET",
          url:`clientes/${id}`,
          headers:{
              'authorization': 'Bearer '+token,
          }
        })
      .then((response) => setLead(response.data))
      .catch( e => { toast.error('Oops, algo deu errado')}) 
    }
    function updateLead(token:string, id:string, status:string){
        api({
            method:"PUT",
            url:`clientes/${id}`,
            headers:{
                'authorization': 'Bearer '+token,
            },
            data:{
                status:status
            }
      })
        .then(
            response => {
                setLead(response.data)
                toast.success('Atualizado com com sucesso!', {
                hideProgressBar: false,
                onClose: () => getLead(token,id)
              })
            }
        )
        .catch( e => { toast.error('Oops, algo deu errado')}) 

    }

    return{
        updateLead,
        getLeads,
        leads,
        getLead,
        lead
    }

}