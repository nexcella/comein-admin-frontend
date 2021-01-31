import React, {ReactNode, useCallback, useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import {useTranslation} from "react-i18next";
import {reaction} from "mobx";
import {observer} from "mobx-react";

import {Auth} from "./screens/public/Auth";
import {Main} from "./screens/protected/Main";
import {useAuthStore} from "./providers/StoreProvider";
import {logger} from "./utils/logger";
import {Register} from "./screens/public/Register";
import {Forgot} from "./screens/public/Forgot";
import {useStore} from "./providers/StoreProvider";

interface ProtectedRouteProps {
  children: ReactNode,
  path: string,
  exact?: boolean
}

const ProtectedRoute = observer(({children, path, exact = false}: ProtectedRouteProps) => {
  const {isLoggedIn} = useAuthStore();
  const render = useCallback(({location}) => {
    if (isLoggedIn) {
      return children
    }
    logger.debug(`Access denied: ${path}. Redirect to: /auth`);
    return <Redirect to={{pathname: "/auth", state: {from: location}}}/>
  }, [isLoggedIn]);

  return (
    <Route
      exact={exact}
      path={path}
      render={render}
    />
  )
});

export function Router() {
  const store = useStore();
  const {i18n} = useTranslation();

  useEffect(() => {
    logger.debug(`App locale: ${store.appStore.locale}`);
    i18n.changeLanguage(store.appStore.locale)
  }, [])

  reaction(
    () => store.appStore.locale,
    locale => {
      i18n.changeLanguage(locale).then(() => {
        logger.debug(`Change locale: ${locale}`);
      });
    }
  );


  return (
    <BrowserRouter>
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/register' component={Register}/>
        <Route path='/forgot' component={Forgot}/>
        <ProtectedRoute path='/'>
          <Main/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}


