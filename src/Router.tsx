import React, {ReactNode} from 'react';
import {inject, observer} from "mobx-react";
import {BrowserRouter, NavLink, Redirect, Route, Switch} from "react-router-dom"

import {Auth} from "./screns/Auth";
import {Home} from "./screns/Home";
import {AuthStore} from "./stores/AuthStore";

const ProtectedRoute = inject("authStore")(
  observer(({children, path, authStore}: { children: ReactNode, path: string, authStore?: AuthStore }) => {
    return (
      <Route
        path={path}
        render={({location}) => authStore.isLoggedIn ? (children) : (
          <Redirect to={{pathname: "/auth", state: {from: location}}}
          />
        )}
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


