import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Dash from '../../assets/img/dashboard.png'
import { ConsultorStyled } from './style';

type props ={
  img:string,
  link:string;
}
const Consultor: React.FC = () => {
  const Card = (props:props) =>{
    const history = useHistory()
    return (
      <div className="card">
        <div 
        className="card__body"
        onClick={() => history.push(`/${props.link}`)}
        >
          <img src={props.img} alt="" className="card__image" />
        </div>
        <br/>
      </div>
    );
  }


  return (
    <>
    <Nav/>
    <ConsultorStyled>
      <div className="wrapper">
        <Card
          img="https://riseupmarketing.com.br/wp-content/uploads/2019/02/leads_2.jpg"
          link="leads"
        />
        <Card
          img="https://1.bp.blogspot.com/-hUe-a2BlvWU/V7NBLtE8NnI/AAAAAAAAH5s/F8UL76I8UeE0PQDlqJNDzSg-OGQS3bJEgCLcB/s1600/CURSOS.png"
          link="cursos"
        />
        <div className="card_dash">
        <div 
        className="card__body"
        >
        <a href= "https://dashboardprometheus.herokuapp.com/dashboard/2-a-look-at-your-clientes-table">
        <img src={Dash} alt="my image" />
        </a>        </div>
        <br/>
      </div>
      </div>
    </ConsultorStyled>
    <Footer/>
    </>
  );
}

export default Consultor;

