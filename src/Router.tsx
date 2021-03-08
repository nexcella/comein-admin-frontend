import React, {ReactNode, useCallback} from 'react';
import {observer} from "mobx-react-lite";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"

import {useAuthStore} from "./providers/StoreProvider";
import {Auth} from "./screens/public/Auth";
import {Main} from "./screens/protected/Main";
import {Register} from "./screens/public/Register";
import {Forgot} from "./screens/public/Forgot";
import {logger} from "./utils/logger";
import {Projects} from "./screens/protected/projects/Projects";

interface ProtectedRouteProps {
  children: ReactNode,
  path: string,
  exact?: boolean
}

const ProtectedRoute = observer(({children, path, exact = false}: ProtectedRouteProps) => {
  const authStore = useAuthStore();
  const render = useCallback(({location}) => {
    if (authStore.isLoggedIn) {
      return children
    }
    logger.debug(`Access denied: ${path}. Redirect to: /auth`);
    return <Redirect to={{pathname: "/auth", state: {from: location}}}/>
  }, [authStore.isLoggedIn]);

  return (
    <Route
      exact={exact}
      path={path}
      render={render}
    />
  )
});

export function Router() {
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


