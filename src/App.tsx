import React from "react";

import {css} from 'astroturf';
import {VersionProvider} from "./providers/VersionProvider";
import {Router} from "./Router";
import {StoreProvider} from "./stores/StoreProvider";
import {AuthProvider} from "./components/auth/AuthProvider";
import {ErrorBoundary} from "./components/error/ErrorBoundary";

import './i18n';

const styles = css`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700,700i&display=swap&subset=cyrillic,cyrillic-ext');
  @import '../public/reset.scss';
  @import '../public/main.scss';
  body {
    background: #F4F6FA;
  }
`

export function App() {
  return (
    <ErrorBoundary>
      <VersionProvider css={styles}>
        <StoreProvider>
          <AuthProvider>
            <Router/>
          </AuthProvider>
        </StoreProvider>
      </VersionProvider>
    </ErrorBoundary>
  )
}
