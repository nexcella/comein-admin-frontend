import React from "react";
import styled from "astroturf";
import {Link} from "react-router-dom";

import {Profile} from "../../stores/AuthStore";
import {useAuthState} from "../auth/AuthProvider";

const UserButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  color: #434334;
`

const Button = styled.div`
  background: white;
  height: 45px;
  min-width: 190px;
  max-width: 300px;
  border-radius: 29px;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
`

const AvatarPlaceholder = styled.div`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background: #C4C4C4;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
`

const UsernameWrapper = styled.span`
  margin-left: 12px;
`

export function UserButton() {
  const {profile} = useAuthState();
  return (
    <UserButtonWrapper>
      <Link to='/settings'>
        <Button>
          <AvatarPlaceholder>{profile?.username[0]}</AvatarPlaceholder>
          <UsernameWrapper>Настройки аккаунта</UsernameWrapper>
        </Button>
      </Link>
    </UserButtonWrapper>
  )
}
