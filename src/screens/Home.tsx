import React from "react";
import {useVersion} from "../providers/VersionProvider";
import {LogoutButton} from "../components/auth/LogoutButton";

export function Home() {
  const version = useVersion();
  return (
    <>
      <div>Home</div>
      <div>Version: {version}</div>
      <LogoutButton>Logout</LogoutButton>
    </>
  )
}
