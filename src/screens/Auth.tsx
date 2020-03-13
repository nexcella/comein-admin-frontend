import React from "react";
import {Link, Redirect} from "react-router-dom"

import styled from "astroturf";

import {useAuthState} from "../components/auth/AuthProvider";
import {Logo} from "../components/logo/Logo";
import {AuthForm} from "../components/auth/AuthForm";

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  height: 100vh;
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


export const Auth = () => {
  const authState = useAuthState();
  if (authState.isLoggedIn) {
    return <Redirect to="/"/>
  }

  return (
    <AuthWrapper>
      <div/>
      <FormWrapper>
        <Logo/>
        <Subtitle>личный кабинет организатора</Subtitle>
        <AuthForm/>
        <ForgotLinkWrapper>
          <ForgotLink to='/forgot'>забыли пароль?</ForgotLink>
        </ForgotLinkWrapper>
      </FormWrapper>
      <RegisterWrapper>
        Нет аккаунта? <RegisterLink to={'/register'}>Создайте своё первое мероприятие</RegisterLink>
      </RegisterWrapper>
    </AuthWrapper>
  );
};
