import React, {ReactNode, useEffect, useLayoutEffect} from "react";
import {reaction} from "mobx";
import {observer} from "mobx-react-lite";
import {css} from 'astroturf';
import {useTranslation} from "react-i18next";

import {ErrorBoundary} from "./components/error/ErrorBoundary";
import {logger} from "./utils/logger";

import {VersionProvider} from "./providers/VersionProvider";
import {StoreProvider, useApiService, useAppStore, useAuthStore} from "./providers/StoreProvider";
import {Router} from "./Router";

import './i18n';
import "react-datepicker/dist/react-datepicker.css";

const styles = css`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700,700i&display=swap&subset=cyrillic,cyrillic-ext');
  @import '../public/reset.scss';
  @import '../public/main.scss';
  body {
    background: #F4F6FA;
  }
`

const AuthWrapper = observer(function AuthWrapper({children}: { children: ReactNode }) {
  const authStore = useAuthStore();
  const appStore = useAppStore();
  const apiService = useApiService();

  useLayoutEffect(() => {
    if(appStore.isStorageLoaded) {
      apiService.setToken(authStore.token);
    }
  }, [authStore.token, appStore.isStorageLoaded])

  // @TODO add loading
  return <>
    {appStore.isStorageLoaded ? children : 'loading'}
  </>;
});

const LocaleProvider = observer(function LocaleProvider({children}: { children: React.ReactNode }) {
  const appStore = useAppStore();
  const {i18n} = useTranslation();

  useEffect(() => {
    logger.debug(`App locale: ${appStore.locale}`);
    i18n.changeLanguage(appStore.locale)
  }, [])

  reaction(
    () => appStore.locale,
    locale => {
      i18n.changeLanguage(locale).then(() => {
        logger.debug(`Change locale: ${locale}`);
      });
    }
  );
  return (
    <>{children}</>
  )
});

export function App() {
  return (
    <div css={styles}>
      <ErrorBoundary>
        <VersionProvider>
          <StoreProvider>
            <LocaleProvider>
              <AuthWrapper>
                <Router/>
              </AuthWrapper>
            </LocaleProvider>
          </StoreProvider>
        </VersionProvider>
      </ErrorBoundary>
    </div>
  )
}
