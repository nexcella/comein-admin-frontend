import React, {createContext, ReactNode, useContext} from "react";
import {getVersion} from "../utils/version";
import {logger} from "../utils/logger";

const version = getVersion();
const VersionContext = createContext(version);

export function VersionProvider({children}: { children: ReactNode }) {
  logger.info(`Application version: ${version}`);
  return (
    <VersionContext.Provider value={version}>
      {children}
    </VersionContext.Provider>
  )
}

export function useVersion() {
  return useContext(VersionContext);
}
