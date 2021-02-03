import React, {useEffect} from "react";
import {Link, Redirect} from "react-router-dom"
import styled from "astroturf";
import {observer} from "mobx-react-lite";

import {useAuthStore} from "../../providers/StoreProvider";
import {Logo} from "../../components/logo/Logo";
import {GoogleLoginButton} from "../../components/auth/GoogleLoginButton";
import {RegisterForm} from "../../components/auth/RegisterForm";
import {PublicWrapper} from "./PublicWrapper";


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

export const Register = observer(function Register() {
  const authState = useAuthStore();

  useEffect(() => {
    authState.clear();
  }, [authState.clear])

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
          <GoogleLoginButton register/>
        </GoogleLoginWrapper>
        <Label>или</Label>
        <RegisterForm/>
      </FormWrapper>
      <RegisterWrapper>
        Уже зарегистрированы?<br/>
        <RegisterLink to='/auth'>Войти в аккаунт</RegisterLink>
      </RegisterWrapper>
    </PublicWrapper>
  );
});
