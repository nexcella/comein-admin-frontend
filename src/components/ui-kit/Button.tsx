import React from "react";
import styled from "astroturf";
import {Loader} from "./Loader";

const ButtonComponent = styled.button`
  background: #4FACFE;
  border: none;
  font-size: 16px;
  color: white;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  outline: none;
  &:focus {
    border: 1px solid #339FFF;
    background-color: #45A5F9;
    box-shadow: 0 0 1px 1px #45A5F9;
  }
  &:active {
    background-color:#339FFF;
  }
  &:disabled {
    background-color: #75b8f8;
  }
  
  & svg {
    height: 30px;
  }
`

type ButtonProps = {
  text: string,
  disabled?: boolean,
  pending?: boolean,
  type?: 'submit',
}

export function Button(
  {
    text = '',
    type = 'submit',
    disabled = false,
    pending = false
  }: ButtonProps
) {
  return (
    <ButtonComponent type={type} disabled={disabled}>
      {pending ? <Loader size='small'/> : text}
    </ButtonComponent>
  )
}
