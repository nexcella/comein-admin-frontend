import React from 'react';
import styled from "astroturf";
import {Logo} from "../logo/Logo";
import {useAuthStore} from "../../providers/StoreProvider";
import {UserButton} from "./UserButton";
import {Link} from "react-router-dom";

const HeaderBackground = styled.header`
  width: 100%;
  height: 150px;
  background: linear-gradient(90deg, var(--support-color) 0%, var(--primary-color) 100%);;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LogoWrapper = styled.div`
  width: 240px;
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
