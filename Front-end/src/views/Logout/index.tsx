import React from 'react';
import { StyledLogin } from './style';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { Redirect } from 'react-router';



const Logout: React.FC = () => {
  localStorage.removeItem('@ServiceToken')
  return (
    <>
    <Nav/>
    <StyledLogin>
      <Redirect to="/"/>
    </StyledLogin>
    <Footer/>
    </>
  );
}

export default Logout;