import React from "react";
import {GoogleLogin} from 'react-google-login';
import {config} from "../../config/app";

export function GoogleLoginButton() {
  return (
    <GoogleLogin
      clientId={String(config.googleClientId)}
      onFailure={(res) => {
        console.error({res})
      }}
      onSuccess={(res) => console.debug({res})}
      buttonText='Войти с помощью Google'
    />
  );
}
