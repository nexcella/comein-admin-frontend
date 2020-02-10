import React from "react";

import {VersionProvider} from "./providers/VersionProvider";
import {Router} from "./Router";


export function App() {
  return (
    <VersionProvider>
      App
      <Router/>
    </VersionProvider>

  )
}
