import { useState } from "react";
import { apicep } from "../services/api";

interface IDados{
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

export default function useCep(){
  const [dados, setDados] = useState <IDados>({} as IDados)
  function getCepData(cep:string){

    if (cep.length !== 8) {
      return;
    }
  apicep
      .get(`${cep}/json`)
      .then((response) => setDados(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err)
      })
  }
  return{
    getCepData,
    dados
  }

}