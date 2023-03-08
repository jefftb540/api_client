import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import * as colors from '../config/colors';

export default createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: ${colors.primaryDarkColor};
    color: ${colors.primaryColor}
  }

  html, body, #root{
    height: 100%;
  }

  button{
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #FFF;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transition: all 500ms;
  }

  button:hover{
    filter: brightness(80%);
  }

  a{
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul{
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background-color: ${colors.sucessColor};
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background-color: ${colors.errorColor};
  }
`;

export const Container = styled.section`
  max-width: 480px;
  background-color: white;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 0 rgba(0, 0, 10, 0.1);
`;
