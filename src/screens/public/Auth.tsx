import React from "react";
import {Link, Redirect} from "react-router-dom"

import styled from "astroturf";

import {useAuthStore} from "../../providers/StoreProvider";
import {Logo} from "../../components/logo/Logo";
import {AuthForm} from "../../components/auth/AuthForm";
import {GoogleLoginButton} from "../../components/auth/GoogleLoginButton";
import {PublicWrapper} from "./PublicWrapper";
import {observer} from "mobx-react";

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
  padding-bottom: 32px;
  color: #5F5E5E;
`

const RegisterLink = styled(Link)`
  color: #45A5F9;
  text-decoration: none;
`

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

export const Auth = observer(function Auth() {
  const authState = useAuthStore();
  if (authState.isLoggedIn) {
    return <Redirect to="/"/>
  }

  return (
    <PublicWrapper>
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
        Нет аккаунта?<br/>
        <RegisterLink to='/register'>Создайте своё первое мероприятие</RegisterLink>
      </RegisterWrapper>
    </PublicWrapper>
  );
});
