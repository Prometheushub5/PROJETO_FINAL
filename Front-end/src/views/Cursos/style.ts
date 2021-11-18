import styled from "styled-components";

export const CursoStyled = styled.div`
//   // display: flex;
//   // justify-content: center;
//   // align-items: center;
//   // width: 100%;
//   // height: 100vh;
background-color: #041832;
//   color: #fff;
//   .card{
//     background-color: #fff;
//     padding: 22px;
//     b {console.log(data.curso_id)}order-radius: 22px;
//     }
// 
@import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");

/*   color variables */
$clr-primary: #d50000;
$clr-primary-hover: #29e6a7;
$clr-primary-dark: #039d69;
$clr-gray100: #f9fbff;
$clr-gray150: #f4f6fb;
$clr-gray200: #eef1f6;
$clr-gray300: #e1e5ee;
$clr-gray400: #767b91;
$clr-gray500: #4f546c;
$clr-gray600: #2a324b;
$clr-gray700: #161d34;

/*   border radius */
$radius: 0.2rem;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Oxygen, sans-serif;
  margin: 2rem;
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

.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 16rem));
  gap: 2rem;
  justify-content: center;
}

.card {
  display: grid;
  background: #f9f9f9;
  max-width: 300px;
  max-height: 400px;
  border-radius: 22px;
  padding: 22px;
  overflow: hidden;
  box-shadow: 0 2px 20px $clr-gray300;
  border-radius: $radius;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 200ms ease-in;
  h5 {
    font-family: 'Roboto' , sans-serif;
    text-align: center;
    font-size: 22px;
    color: #8c52e5;
  }
  &__image {
    height: 12rem;
    width: 100%;
    object-fit: cover;
    border-radius: 22px;
  }

  &__title {
    padding: 1rem;
  }

  &__description {
    padding: 0 1rem;
    text-decoration: none;
      text-align: center;
      color: #4d4d4d
      font-family: 'Roboto' , sans-serif;
      margin: 20px 0;
  }

  &__btn {
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

  &:hover {
    transform: scale(1.02);
  }

  &:hover &__btn {
    background: $clr-primary;
    color: white;
  }
}
`