import React, {ReactNode} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import logo from './logo.png';
import {Home} from "./Home";

function VersionProvider({children}: { children: ReactNode }) {
  const version = '0.0.1';
  console.debug({version});
  return (
    <>
      {children}
    </>
  )
}

export function App() {
  return (
    <VersionProvider>
      App
      <Router>
        <Switch>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
      <img src={logo}/>
    </VersionProvider>

  )
}
