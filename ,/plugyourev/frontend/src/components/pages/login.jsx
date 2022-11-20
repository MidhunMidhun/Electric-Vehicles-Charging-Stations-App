import React from 'react'

import styled from 'styled-components';
import './login.css'
import './input'
import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';
import Navbar from '../Navbar';

function login() {
  
  return (
    <>
    <Navbar />
    <MainContainer className='main-container'>
        <WelcomeText>Admin Login</WelcomeText>
        <InputContainer>
        
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        
        </InputContainer>        
          <Link to="./adminmap">
          <button  className='signin' type="submit">SIGN IN</button>
          </Link>
    </MainContainer>
    </>
  )
}

const MainContainer=styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  width: 25vw;
  margin: 5% 35%;
  background-image: url("/public/images/login.jpg") ;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10em );
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 30vw;
    height: 50vh;
    
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 60vh;
    margin:10%;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 25vw;
    height: 50vh;
    margin-top:20%;
  }
  @media only screen and (min-width: 768px) {
    width: 25vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1080px) {
    width: 25vw;
    height: 60vh;
    margin-top: 8%;
    margin-left: 35%;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
   display: flex;
   flex-direction: column;
  // justify-content: space-around;
  // align-items: center;
  // height: 20%;
  // width: 100%;
`;

export default login;
