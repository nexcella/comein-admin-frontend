import React from "react";

import {VersionProvider} from "./providers/VersionProvider";
import {Router} from "./Router";
import {StoreProvider} from "./stores/StoreProvider";

export function App() {
  return (
    <VersionProvider>
      <StoreProvider>
        App
        <Router/>
      </StoreProvider>
    </VersionProvider>

  )
}
