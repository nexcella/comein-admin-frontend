import React from "react";
import {useForm} from "react-hook-form";
import {Redirect} from "react-router-dom"
import {useAuthActions, useAuthState} from "../components/auth/AuthProvider";
import {Logo} from "../components/logo/Logo";

export const Auth = () => {
  const authState = useAuthState();
  const authActions = useAuthActions();
  const {register, handleSubmit} = useForm();
  const onSubmit = handleSubmit(({username, password}) => {
    authActions.login({username, password});
  });

  if (authState.isLoggedIn) {
    return <Redirect to="/"/>
  }

  return (
    <>
      {authState.isLoading && <p>Loading...</p>}
      <div>Auth</div>
      <Logo/>
      <form onSubmit={onSubmit}>
        <input type="text" ref={register} name='username' autoComplete='username'/>
        <input type="password" ref={register} name='password' autoComplete='current-password'/>
        <button type='submit'>Отправить</button>
      </form>
    </>
  );
};
