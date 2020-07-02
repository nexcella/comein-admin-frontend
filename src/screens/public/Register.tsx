import React from "react";
import {Link, Redirect} from "react-router-dom"

import styled from "astroturf";

import {useAuthState} from "../../components/auth/AuthProvider";
import {Logo} from "../../components/logo/Logo";
import {GoogleLoginButton} from "../../components/auth/GoogleLoginButton";
import {RegisterForm} from "../../components/auth/RegisterForm";

const AuthScreen = styled.div`
  display: flex;
`;

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  flex-grow: 1;
  margin-top: 20px;
  
  @media (min-width: 1050px) {
    min-width: 570px;
  }
`

const FormWrapper = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Subtitle = styled.span`
  color: #5F5E5E;
  margin: 8px auto;
  font-size: 16px;
  width: 200px;
`

const RegisterWrapper = styled.div`
  padding-bottom: 32px;
  color: #5F5E5E;
`

const RegisterLink = styled(Link)`
  color: #45A5F9;
  text-decoration: none;
`

const Background = styled.div`
  background: linear-gradient(90deg, #4FACFE, #237CCB);
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  flex-grow: 3;
  @media (max-width: 1050px) {
    display: none;
  }
`;


const GoogleLoginWrapper = styled.div`
  margin: 20px 0;
  & button {
    width: 100%;
    justify-content: center;
  }
`
const Label = styled.span`
  color: #5F5E5E;
`

export const Register = () => {
  const authState = useAuthState();
  if (authState.isLoggedIn) {
    return <Redirect to="/"/>
  }

  return (
    <AuthScreen>
      <AuthWrapper>
        <div/>
        <FormWrapper>
          <Logo/>
          <Subtitle>личный кабинет организатора</Subtitle>
          <GoogleLoginWrapper>
            <GoogleLoginButton register/>
          </GoogleLoginWrapper>
          <Label>или</Label>
          <RegisterForm/>
        </FormWrapper>
        <RegisterWrapper>
          Уже зарегистрированы?<br/>
          <RegisterLink to='/auth'>Войти в аккаунт</RegisterLink>
        </RegisterWrapper>
      </AuthWrapper>
      <Background/>
    </AuthScreen>
  );
};
