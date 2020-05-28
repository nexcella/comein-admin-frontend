import React from "react";
import {useVersion} from "../providers/VersionProvider";
import {LogoutButton} from "../components/auth/LogoutButton";
import {apiService} from "../services/api/ApiService";

export function Home() {
  const version = useVersion();
  return (
    <>
      <div>Home</div>
      <div>Version: {version}</div>
      <button onClick={() => apiService.auth.profile()}>TEST</button>
      <LogoutButton>Logout</LogoutButton>
    </>
  )
}
