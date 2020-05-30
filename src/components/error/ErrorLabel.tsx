import React from "react";
import styled from 'astroturf';

export const ErrorWrapper = styled.div`
  margin: 12px auto 0;
  color: #EB7575;
`

export function ErrorLabel({text}: { text: string }) {
  return (
    <ErrorWrapper>
      {text}
    </ErrorWrapper>
  )
}
