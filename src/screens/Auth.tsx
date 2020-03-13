import React from "react";
import {Link, Redirect} from "react-router-dom"

import styled from "astroturf";

import {useAuthState} from "../components/auth/AuthProvider";
import {Logo} from "../components/logo/Logo";
import {AuthForm} from "../components/auth/AuthForm";

const AuthWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 200px;
`

const Subtitle = styled.span`
  color: #5F5E5E;
  margin-top: 8px;
  font-size: 16px;
`

const ForgotLink = styled(Link)`

`;


export const Auth = () => {
  const authState = useAuthState();
  if (authState.isLoggedIn) {
    return <Redirect to="/"/>
  }

  return (
    <AuthWrapper>
      <Logo/>
      <Subtitle>личный кабинет организатора</Subtitle>
      <AuthForm/>
      <div>
        <Link to='/forgot'>забыли пароль?</Link>
      </div>
    </AuthWrapper>
  );
};
