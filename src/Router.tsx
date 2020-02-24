import React, {ReactNode} from 'react';
import {BrowserRouter, NavLink, Redirect, Route, Switch} from "react-router-dom"
import {observer} from "mobx-react";

import {Auth} from "./screens/Auth";
import {Home} from "./screens/Home";
import {logger} from "./utils/logger";
import {useAuthState} from "./components/auth/AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode,
  path: string,
}

const ProtectedRoute = observer(({children, path}: ProtectedRouteProps) => {
  const {isLoggedIn} = useAuthState();
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
});

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


