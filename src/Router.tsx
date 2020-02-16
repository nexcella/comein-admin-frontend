import React, {ReactNode} from 'react';
import {inject, observer} from "mobx-react";
import {BrowserRouter, NavLink, Redirect, Route, Switch} from "react-router-dom"

import {Auth} from "./screens/Auth";
import {Home} from "./screens/Home";
import {AuthStore} from "./stores/AuthStore";
import {logger} from "./utils/logger";

interface ProtectedRouteProps {
  children: ReactNode,
  path: string,
  authStore?: AuthStore
}

const ProtectedRoute = inject("authStore")(
  observer(({children, path, authStore: {isLoggedIn}}: ProtectedRouteProps) => {
    return (
      <Route
        path={path}
        render={({location}) => {
          if (isLoggedIn) {
            return children
          }
          logger.debug(`Access denied: ${path}. Redirect to: /auth`);
          return <Redirect to={{pathname: "/auth", state: {from: location}}}/>
        }}
      />
    )
  })
);

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/auth'>
          <Auth/>
          <NavLink to={'/'}>Home -> </NavLink>
        </Route>
        <ProtectedRoute path='/'>
          <Home/>
          <NavLink to={'/auth'}>Auth -> </NavLink>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}


