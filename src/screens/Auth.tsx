import React from "react";
import {useForm} from "react-hook-form";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom"

import {AuthStore} from "../stores/AuthStore";

export const Auth = inject('authStore')(
  observer(({authStore}: { authStore?: AuthStore }) => {
    const {register, handleSubmit} = useForm();
    const onSubmit = handleSubmit(({username, password}) => {
      authStore.login({username, password});
    });

    if (authStore.isLoggedIn) {
      return <Redirect to="/"/>
    }

    return (
      <>
        {authStore.isLoading && <p>Loading...</p>}
        <div>Auth</div>
        <form onSubmit={onSubmit}>
          <input type="text" ref={register} name='username' autoComplete='username'/>
          <input type="password" ref={register} name='password' autoComplete='current-password'/>
          <button type='submit'>Отправить</button>
        </form>
      </>
    );
  })
);
