import React from "react";
import {useVersion} from "../providers/VersionProvider";

export function Home() {
  const version = useVersion();
  return (
    <>
      <div>Home</div>

      <div>Version: {version}</div>
    </>
  )
}
