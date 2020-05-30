import React, {useEffect} from "react";
import {useVersion} from "../../providers/VersionProvider";
import {LogoutButton} from "../../components/auth/LogoutButton";
import {useAuthActions, useAuthState} from "../../components/auth/AuthProvider";

export function Main() {
  const {profile} = useAuthState()
  const {getProfile} = useAuthActions();

  useEffect(getProfile, []);

  const version = useVersion();
  return (
    <>
      <div>Home</div>
      {profile?.id}<br/>
      {profile?.username}<br/>
      {profile?.roles}

      <div>Version: {version}</div>
      <LogoutButton>Logout</LogoutButton>
    </>
  )
}
