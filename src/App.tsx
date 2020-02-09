import React from "react";

import logo from './logo.png';
import {VersionProvider} from "./providers/VersionProvider";
import {Router} from "./Router";


export function App() {
  return (
    <VersionProvider>
      App
      <img src={logo}/>
      <Router/>
    </VersionProvider>

  )
}
