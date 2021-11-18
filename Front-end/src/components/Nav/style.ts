import styled from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #041832;
  img{
    max-width: 350px;
    height: auto;
  }
  .nav-links{
    display: flex;
    a{
      text-decoration: none;
      color: #fff;
      font-family: 'Roboto' , sans-serif;
      font-size: 14px;
      margin: 12px;
      transition: 0.6s;
      &:hover{
        color: #676666;
      }
    }
    .Link_disabled{
      color: #041832;
      &:hover{
        color: #041832;
      }
    }
  }
` 