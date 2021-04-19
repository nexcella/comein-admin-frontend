import React from "react";
import styled from "astroturf";
import {Loader} from "./Loader";
import {Link} from "react-router-dom";

const ButtonComponent = styled.button`
  background: var(--primary-color);
  border: none;
  font-size: 16px;
  color: white;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  padding: 0 12px;
  outline: none;

  &:focus {
    border: 1px solid var(--primary-color);
    background-color: var(--support-color);
    box-shadow: 0 0 1px 1px var(--support-color);
  }

  &:active {
    background-color: var(--primary-color);
  }

  &:disabled {
    background-color: #dfe4e9;
    color: #8c99a8;
  }

  & svg {
    height: 30px;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
`;

type ButtonProps = {
  text: string,
  onClick?: () => void,
  disabled?: boolean,
  pending?: boolean,
  type?: 'submit',
  to?: string
}

export function Button(
  {
    onClick,
    text = '',
    type = 'submit',
    disabled = false,
    pending = false
,
    to
  }: ButtonProps
) {
  if (to && text) {
    return <StyledLink to={to}>{text}</StyledLink>
  }
  return (
    <ButtonComponent type={type} disabled={disabled} onClick={onClick}>
      {pending ? <Loader size='small' fill={'#8c99a8'}/> : text}
    </ButtonComponent>
  )
}
