import React from "react";

import {css} from 'astroturf';

const styles = css`
  @import '../public/reset.scss';
`

import {VersionProvider} from "./providers/VersionProvider";
import {Router} from "./Router";
import {StoreProvider} from "./stores/StoreProvider";
import {AuthProvider} from "./components/auth/AuthProvider";

export function App() {
  return (
    <VersionProvider css={styles}>
      <StoreProvider>
        <AuthProvider>
          App
          <Router/>
        </AuthProvider>
      </StoreProvider>

    </VersionProvider>

  )
}
