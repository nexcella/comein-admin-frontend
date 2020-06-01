import React from "react";
import styled from "astroturf";
import {Profile} from "../../stores/AuthStore";

const UserButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  color: #434334;
`

const Button = styled.div`
  background: white;
  height: 50px;
  min-width: 190px;
  max-width: 300px;
  border-radius: 12px;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
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

export function UserButton({profile}: { profile: Profile }) {
  return (
    <UserButtonWrapper>
      <Button>
        <AvatarPlaceholder>{profile.username[0]}</AvatarPlaceholder>
        <UsernameWrapper>{profile.username}</UsernameWrapper>
      </Button>
    </UserButtonWrapper>
  )
}
