import React from "react";
import {GoogleLogin} from 'react-google-login';

export function GoogleLoginButton() {
  return (
    <GoogleLogin
      clientId='1066587620419-9ck020c8qsg3o52efoksgec9ki1k462u.apps.googleusercontent.com'
      onFailure={(res) => {
        console.error({res})
      }}
      onSuccess={(res) => console.debug({res})}
      buttonText='Войти с помощью Google'
    />
  );
}
