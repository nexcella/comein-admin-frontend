import React from "react";
import {GoogleLogin} from 'react-google-login';

import {config} from "../../config/app";

export function GoogleLoginButton({register = false}: {register?: boolean}) {
  return (
    <GoogleLogin
      clientId={String(config.googleClientId)}
      onFailure={(res) => {
        console.error({res})
      }}
      onSuccess={(res) => console.debug({res})}
      buttonText={register ? 'Регистрация с Google': 'Войти с помощью Google'}
    />
  );
}
