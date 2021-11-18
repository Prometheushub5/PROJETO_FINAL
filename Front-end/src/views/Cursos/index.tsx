import React, {useEffect, useState} from 'react';
import { CursoStyled } from './style';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer'
import usePagination from '../../hooks/usePagination';
import useCourse from '../../hooks/useCourse';
import { useHistory } from 'react-router';


interface props{
  img:string,
  title:string,
  id:number
}
const Cursos: React.FC = () => {
  const token = localStorage?.getItem('@ServiceToken')
  const [islogged,setisLogged]=useState<boolean>()


  const { actualPage,setActualPage } = usePagination()
  const {getCourses, data} = useCourse()

  useEffect(()=>{
    getCourses(16,actualPage)
  },[actualPage])
  
  useEffect(()=>{
    if(typeof token ==="string"){
    setisLogged(true)  
  }
  },[token])

  if(islogged)
  {  
    const Card = (props:props) =>{
      const history = useHistory()
      return (
        <div className="card">
          <div className="card__body">
            <img src={props.img} className="card__image" />
            <h5 className="card__title">{props.title}...</h5>
          </div>
          <button 
            className="card__btn"
            onClick={() => history.push("/editarcurso/"+props.id)}
            >Editar Curso</button>
        </div>
      );
    }
  return (
    <>
      <Nav />
        <CursoStyled>
        <div className="wrapper">
          {data.cursos?.map(curso =>(
            <Card 
              img={`https://picsum.photos/id/${curso?.id}/500/600`}
              title={curso?.nome.substr(0,30)}
              id={curso?.id}
            />)
          )}
        </div>
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
        </CursoStyled>
      <Footer />
    </>
  )}

  const Card = (props:props) =>{
    const history = useHistory()
    return (
      <div className="card">
        <div className="card__body">
          <img src={props.img} className="card__image" />
          <h5 className="card__title">{props.title}...</h5>
        </div>
        <button 
          className="card__btn"
          onClick={() => history.push("/curso/"+props.id)}
          >Mais Informações</button>
      </div>
    );
  }
  return (
    <>
      <Nav />
        <CursoStyled>
        <div className="wrapper">
          {data.cursos?.map(curso =>(
            <Card 
              img={`https://picsum.photos/id/${curso?.id}/500/600`}
              title={curso?.nome.substr(0,30)}
              id={curso?.id}
            />)
          )}
        </div>
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
        </CursoStyled>
      <Footer />
    </>
  )
}
export default Cursos;