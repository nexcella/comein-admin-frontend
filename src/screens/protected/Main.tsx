import React, {useEffect} from "react";
import styled from "astroturf";
import {Route, Switch} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {useAuthStore} from "../../providers/StoreProvider";
import {LogoutButton} from "../../components/auth/LogoutButton";
import {Header} from "../../components/header/Header";
import {Sidebar} from "../../components/sidebar/Sidebar";
import {NetworkState} from "../../components/network/NetworkState";

const Wrapper = styled.div`
  display: flex;
`

const Content = styled.div`
  position: relative;
  padding: 48px 12px 12px;
  width: 100%;
`

export const Main = observer(function Main() {
  const authStore = useAuthStore()

  useEffect(() => {
    authStore.getProfile()
  }, [authStore.getProfile]);

  return (
    <>
      <NetworkState/>
      <Header/>
      <Wrapper>
        <Sidebar/>
        <Content>
          <Switch>
            <Route path='/' exact render={() => (
              <>
                <div>Home</div>
              </>
            )}/>
            <Route path='/clients' render={() => <div>list of clients</div>}/>
            <Route path='/create-client' render={() => <div>create client</div>}/>
            <Route path='/settings' render={() => <div>
              {authStore.profile?.id}<br/>
              {authStore.profile?.username}<br/>
              {authStore.profile?.name}<br/>
              {authStore.profile?.phone}<br/>
              {authStore.profile?.roles}
              <LogoutButton>Logout</LogoutButton>
            </div>}/>
            <Route path='*' render={() => <div>404</div>}/>
          </Switch>
        </Content>
      </Wrapper>
    </>
  )
});
