import React from 'react';
import styled from "astroturf";
import {Logo} from "../logo/Logo";
import {useAuthState} from "../auth/AuthProvider";
import {UserButton} from "./UserButton";

const HeaderBackground = styled.header`
  width: 100%;
  height: 150px;
  background: linear-gradient(90deg, #FFAE48 0%, #FF7E48 100%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LogoWrapper = styled.div`
  width: 290px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export function Header() {
  const {profile} = useAuthState();
  return (
    <HeaderBackground>
      <LogoWrapper>
        <Logo inline/>
      </LogoWrapper>
      {profile && <UserButton profile={profile}/>}
    </HeaderBackground>
  )
}
