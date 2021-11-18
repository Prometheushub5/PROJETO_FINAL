import styled from 'styled-components';

export const StyledLead = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  background: #041832;
  h5 {
    font-family: 'Roboto' , sans-serif;
    text-align: center;
    font-size: 22px;
    color: #ffffff;
  }
  button{
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer; 
    border: none;
    background: #68de5a;
    padding: 5px;
    border-radius: 12px;
    transition: 0.6s;
    &:hover{
      background: #8c52e5;
      color: #fff;
    }
  }
  .table {
    background: #f9f9f9;
    width: 1200px;
    height: flex;
    border-radius: 22px;
    padding: 22px;
    font-family: 'Roboto' , sans-serif;
    text-align: center;
    font-size: 18px;
    color: #8c52e5;
    border-spacing: 0px;
  }
  .table_body{
    tr:nth-child(even) {background: #FFF}
    tr:nth-child(odd) {background: #EEE}
   
    tr{
      line-height: 50px;
      transition: 0.6s;
      &:hover{
        background: #8c52e5;
        color: #fff;
      }
    }
    
  }
`