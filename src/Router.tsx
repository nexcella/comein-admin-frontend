import React, {ReactNode, useCallback, useEffect} from 'react';
import {BrowserRouter, NavLink, Redirect, Route, Switch} from "react-router-dom"
import {observer} from "mobx-react";

import {Auth} from "./screens/Auth";
import {Home} from "./screens/Home";
import {logger} from "./utils/logger";
import {useAuthState} from "./components/auth/AuthProvider";
import {reaction} from "mobx";
import {useAppStore} from "./stores/StoreProvider";
import {useTranslation} from "react-i18next";

interface ProtectedRouteProps {
  children: ReactNode,
  path: string,
}

const ProtectedRoute = observer(({children, path}: ProtectedRouteProps) => {
  const {isLoggedIn} = useAuthState();
  const render = useCallback(({location}) => {
    if (isLoggedIn) {
      return children
    }
    logger.debug(`Access denied: ${path}. Redirect to: /auth`);
    return <Redirect to={{pathname: "/auth", state: {from: location}}}/>
  },[isLoggedIn]);

  return (
    <Route
      path={path}
      render={render}
    />
  )
});

export function Router() {
  const appStore = useAppStore();
  const {i18n} = useTranslation();

  useEffect(() => {
    logger.debug(`App locale: ${appStore.locale}`);
    i18n.changeLanguage(appStore.locale)
  }, [])

  reaction(
    () => appStore.locale,
    locale => {
      i18n.changeLanguage(locale).then(() => {
        logger.debug(`Change locale: ${locale}`);
      });
    }
  );


  return (
    <BrowserRouter>
      <Switch>
        <Route path='/auth'>
          <Auth/>
        </Route>
        <ProtectedRoute path='/'>
          <Home/>
          <NavLink to={'/auth'}>Auth -> </NavLink>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}


