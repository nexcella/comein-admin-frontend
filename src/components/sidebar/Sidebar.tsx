import React from "react";
import styled from "astroturf";

import {useVersion} from "../../providers/VersionProvider";
import {Loader} from "../ui-kit/Loader";
import {useNetworkStore} from "../../providers/StoreProvider";
import {Menu} from "./Menu";

const SidebarContainer = styled.aside`
  width: 290px;
  min-height: calc(100vh - 100px);
  float: left;
  margin-top: -50px;
  background: white;
  border-radius: 0 48px 0 0;
  position: relative;
  padding-bottom: 30px;
  color: #c2c2c2
`

const VersionContainer = styled.div`
  font-size: 14px;
  color: #c2c2c2;
  position: absolute;
  bottom: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 20px;
  display: flex;
  flex-direction: row;

  & > svg {
    position: absolute;
    height: 20px;
    left: 12px;
  }
`


export function Sidebar() {
  const version = useVersion();
  const networkStore = useNetworkStore();

  return (
    <SidebarContainer>
      <Menu/>
      <VersionContainer>
        <span>Версия: {version}</span>
        {networkStore.isLoading && <Loader fill='gray' size='small'/>}
      </VersionContainer>
    </SidebarContainer>
  )
}
