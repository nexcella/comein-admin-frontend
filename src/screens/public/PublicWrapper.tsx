import React, {ReactNode} from "react";
import styled from "astroturf";


const AuthScreen = styled.div`
  display: flex;
`;

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  flex-grow: 1;
  margin-top: 12px;
  @media (min-width: 1050px) {
    min-width: 570px;
  }
`

const Background = styled.div`
  background: linear-gradient(90deg, #4FACFE, #237CCB);
  width: 100%;
  height: 100vh;
  flex-grow: 3;
  @media (max-width: 1050px) {
    display: none;
  }
`;

export function PublicWrapper({children}: { children: ReactNode }) {
  return (
    <AuthScreen>
      <AuthWrapper>
        {children}
      </AuthWrapper>
      <Background/>
    </AuthScreen>
  )
}
