import React, {useEffect} from "react";
import styled from "astroturf";
import {LogoutButton} from "../../components/auth/LogoutButton";
import {useAuthActions, useAuthState} from "../../components/auth/AuthProvider";
import {Header} from "../../components/header/Header";
import {Sidebar} from "../../components/sidebar/Sidebar";
import {Route, Switch} from "react-router-dom";
import {NetworkState} from "../../components/network/NetworkState";

const Wrapper = styled.div`
  display: flex;
`

const Content = styled.div`
  position: relative;
  padding: 48px 12px 12px;
  width: 100%;
`

export function Main() {
  const {profile} = useAuthState()
  const {getProfile} = useAuthActions();

  useEffect(getProfile, []);

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
                {profile?.id}<br/>
                {profile?.username}<br/>
                {profile?.roles}
                <LogoutButton>Logout</LogoutButton>
              </>
            )}/>
            <Route path='/clients' render={() => <div>list of clients</div>}/>
            <Route path='/create-client' render={() => <div>create client</div>}/>
            <Route path='/settings' render={() => <div>settings</div>}/>
            <Route path='*' render={() => <div>404</div>}/>
          </Switch>
        </Content>
      </Wrapper>
    </>
  )
}
