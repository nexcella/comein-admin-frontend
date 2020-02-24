import React from "react";

import {VersionProvider} from "./providers/VersionProvider";
import {Router} from "./Router";
import {StoreProvider} from "./stores/StoreProvider";
import {AuthProvider} from "./components/auth/AuthProvider";

export function App() {
  return (
    <VersionProvider>
      <StoreProvider>
        <AuthProvider>
          App
          <Router/>
        </AuthProvider>
      </StoreProvider>

    </VersionProvider>

  )
}
