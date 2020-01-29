import React, {ReactNode} from "react";

import logo from './logo.png';

function VersionProvider({children}: { children: ReactNode }) {
  const version = '0.0.1';
  console.debug({version});
  return (
    <>
      {children}
    </>
  )
}

export function App() {
  return (
    <VersionProvider>
      App
      <div/>
      <img src={logo}/>
    </VersionProvider>

  )
}
