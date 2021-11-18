import React, { useEffect, useState } from 'react';
import { NavBar } from './style';
import { Link } from 'react-router-dom';

import LogoGama from '../../assets/img/logo.png'

const Nav: React.FC = () => {
  const token = localStorage?.getItem('@ServiceToken')
  const [islogged,setisLogged]=useState<boolean>()
  useEffect(()=>{
    if(typeof token ==="string"){
    setisLogged(true)  
  }
  },[token])
  if(islogged)
{  return (
    <div>
      <NavBar>
        <img src={LogoGama} alt="Logo Gama" />
        <div className={`nav-links`}>
          <Link to="/consultor"> HOME </Link>
          <Link to="/cursos"> CURSOS </Link>
          <Link to="/leads"> LEADS </Link>
          <Link to="/logout">LOGOFF</Link>
        </div>
      </NavBar>
    </div>
  )}
  return (
    <div>
      <NavBar>
        <img src={LogoGama} alt="Logo Gama" />
        <div className={`nav-links`}>
          <Link to="/cursos"> CURSOS </Link>
          <Link to="/cadastro"> CADASTRE-SE </Link>
          <Link to="/login">LOGIN</Link>
        </div>
      </NavBar>
    </div>
  );
}

export default Nav;