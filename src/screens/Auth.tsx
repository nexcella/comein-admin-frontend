import React from "react";
import {Link, Redirect} from "react-router-dom"

import styled from "astroturf";

import {useAuthState} from "../components/auth/AuthProvider";
import {Logo} from "../components/logo/Logo";
import {AuthForm} from "../components/auth/AuthForm";
import {GoogleLoginButton} from "../components/auth/GoogleLoginButton";

const AuthScreen = styled.div`
  display: flex;
`;

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  height: 100vh;
  flex-grow: 1;
  
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

const ForgotLinkWrapper = styled.div`
  text-align: right;
  margin-top: 10px;
`

const ForgotLink = styled(Link)`
  font-size: 14px;
  color: #45A5F9;
  text-decoration: none;
`;

const RegisterWrapper = styled.div`
  padding-bottom: 24px;
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
  flex-grow: 3;
  @media (max-width: 1050px) {
    display: none;
  }
`;


const GoogleLoginWrapper = styled.div`
  margin: 20px 0;
`
const Label = styled.span`
  color: #5F5E5E;
`

export const Auth = () => {
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
            <GoogleLoginButton/>
          </GoogleLoginWrapper>
          <Label>или</Label>
          <AuthForm/>
          <ForgotLinkWrapper>
            <ForgotLink to='/forgot'>забыли пароль?</ForgotLink>
          </ForgotLinkWrapper>
        </FormWrapper>
        <RegisterWrapper>
          Нет аккаунта?
          <RegisterLink to='/register'>Создайте своё первое мероприятие</RegisterLink>
        </RegisterWrapper>
      </AuthWrapper>
      <Background/>
    </AuthScreen>
  );
};
