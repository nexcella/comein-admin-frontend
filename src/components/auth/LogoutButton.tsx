import React, {ReactNode} from "react";
import {inject, observer} from "mobx-react";
import {AuthStore} from "../../stores/AuthStore";

export const LogoutButton = inject('authStore')(
  observer(({children, authStore}: { children: ReactNode, authStore?: AuthStore }) => {
    return (
      <button onClick={() => authStore.logout()}>
        {children}
      </button>
    );
  })
)
