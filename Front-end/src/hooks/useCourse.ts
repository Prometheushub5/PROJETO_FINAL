import { useState } from "react";
import { api } from "../services/api";

interface IData {
    pagina: number;
    cursos: Cursos[];
  }
interface Cursos {
    id: number;
    nome: string;
    nivel_ensino: string;  
  }
interface Curso {
    id: number;
    nome: string;
    nivel_ensino: string;
    grau_academico?: any;
    modalidade: string;
    unidade: string;
    consultor_id: number;
    created_at: string;
    updated_at: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface IdataCurso {
    curso: Curso;
}

export default function useCourse(){
  const [data, setData] = useState <IData>({} as IData)
  const[courseData, setCourseData]= useState<IdataCurso>({}as IdataCurso)
  function getCourses(pageLimit:number, page:number){
  api
      .get("cursos?limit="+pageLimit+"&page="+page)
      .then((response) => setData(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err)
      })
  }
  function getCourseData(id:string){
    if(!id){
      return }
    else
    api
        .get(`cursos/${id}`)
        .then((response) => setCourseData(response.data))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err)
        })
    }
  function updateCourse(token:string, id:string, data:object){
      api({
          method:"PUT",
          url:`cursos/${id}`,
          headers:{
              'authorization': 'Bearer '+token,
          },
          data:{
              data:data
          }
    })
    .then((response) => {setCourseData(response.data)
      console.log("vamos ver")})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err)
    })

  }

  return{
    getCourses,
    data,
    getCourseData,
    courseData,
    updateCourse
  }

}