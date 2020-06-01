import React, {useEffect} from "react";
import styled from "astroturf";
import {useVersion} from "../../providers/VersionProvider";
import {LogoutButton} from "../../components/auth/LogoutButton";
import {useAuthActions, useAuthState} from "../../components/auth/AuthProvider";
import {Header} from "../../components/header/Header";
import {Sidebar} from "../../components/sidebar/Sidebar";

const Wrapper = styled.div`
  display: flex;
`

const Content = styled.div`
  padding: 12px;
`

export function Main() {
  const {profile} = useAuthState()
  const {getProfile} = useAuthActions();

  useEffect(getProfile, []);

  return (
    <>
      <Header/>
      <Wrapper>
        <Sidebar/>
        <Content>
          <div>Home</div>
          {profile?.id}<br/>
          {profile?.username}<br/>
          {profile?.roles}
          <LogoutButton>Logout</LogoutButton>
        </Content>
      </Wrapper>
    </>
  )
}
