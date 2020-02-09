import React from "react";
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";


import logo from './logo.png';
import {Home} from "./Home";
import {Auth} from "./screns/Auth";
import {VersionProvider} from "./providers/VersionProvider";


export function App() {
  return (
    <VersionProvider>
      App
      <Router>
        <Switch>
          <Route path='/auth'>
            <Auth/>
            <NavLink to={'/'}>Home -> </NavLink>
          </Route>
          <Route path='/'>
            <Home/>
            <NavLink to={'/auth'}>Auth -> </NavLink>
          </Route>
        </Switch>
      </Router>
      <img src={logo}/>
    </VersionProvider>

  )
}
