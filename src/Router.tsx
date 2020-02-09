import React, {ReactNode} from 'react';
import {Auth} from "./screns/Auth";
import {Home} from "./screns/Home";
import {BrowserRouter, NavLink, Redirect, Route, Switch} from "react-router-dom"

function ProtectedRoute({children, path}: { children: ReactNode, path: string }) {
  const a = true;
  return (
    <Route
      path={path}
      render={({location}) =>
        a ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {from: location}
            }}
          />
        )
      }
    />
  )
}

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


