import React from 'react';
import styled, {StyledComponent} from "astroturf";
import {Logo} from "../logo/Logo";
import {useAuthStore} from "../../providers/StoreProvider";
import {UserButton} from "./UserButton";
import {Link} from "react-router-dom";

const HeaderBackground: StyledComponent<"header", {isAdmin?: boolean}> = styled.header`
  width: 100%;
  height: 150px;
  background: linear-gradient(90deg, #46D4DA 0%, #1DB5D8 100%);;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  &.isAdmin {
    background: linear-gradient(90deg, #FFAE48 0%, #FF7E48 100%);
  }
`

const LogoWrapper = styled.div`
  width: 290px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export function Header() {
  const authStore = useAuthStore();
  return (
    <HeaderBackground isAdmin={authStore.profile?.isAdmin}>
      <LogoWrapper>
        <Link to='/'>
          <Logo inline/>
        </Link>
      </LogoWrapper>
      <UserButton/>
    </HeaderBackground>
  )
}
