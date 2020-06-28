import React from "react";
import styled from "astroturf";
import {useNetworkStore} from "../../stores/StoreProvider";

const NetworkStateWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 12px;
  background: rgba(232, 13, 13, 0.88);
  color: white;
  font-weight: bold;
  text-align: center;
`

export function NetworkState() {
  const {hasError} = useNetworkStore();

  return <>
    {hasError && (
      <NetworkStateWrapper>
        Произошла ошибка получения данных. Проверьте сетевое соединение и попробуйте снова.
      </NetworkStateWrapper>
    )}
  </>
}
