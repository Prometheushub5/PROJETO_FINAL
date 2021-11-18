import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";


interface Consultor {
        id: number;
        nome: string;
        email: string;
}

interface Consultores {
    pagina: number;
    consultor: Consultor[];
}
interface iData {
  consultor: Consultor;
}
export default function useConsultant(){
    const [consultants,setConsultants]=useState<Consultores>({} as Consultores);
    const [consultant,setConsultant]=useState<iData>({}as iData)
    function getConsultants(token:string):void{
      api({
            method: "GET",
            url:`consultores?limit=100`,
            headers:{
                'authorization': 'Bearer '+token,
            }
      })
        .then((response) => setConsultants(response.data))
        .catch( e => { toast.error('Oops, algo deu errado')}) 
      }
    function getConsultant(token:string,id:string): void{
        if(!id){
            return }
        api({
          method: "GET",
          url:`consultores/${id}`,
          headers:{
              'authorization': 'Bearer '+token,
          }
        })
      .then((response) => setConsultant(response.data))
      .catch( e => { toast.error('Oops, algo deu errado')}) 
    }

    return{
        getConsultants,
        consultants,
        getConsultant,
        consultant
    }

}