import React, {ChangeEvent} from "react";
import styled from "astroturf";

const InputWrapper = styled.input<{error: boolean}>`
  margin-top: 20px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid rgba(196, 196, 196, 0.7);
  background-color: rgba(248, 248, 248, 0.5);
  padding-left: 12px;
  font-size: 12px;
  line-height: 30px;
  outline: none;
  &:focus {
    border-color: rgba(79, 172, 254, 0.7);
  }
  &.error {
    border-color: #EB7575;
  }
`;

const ErrorSpan = styled.span`
  color: #EB7575;
  font-size: 12px;
`;

type InputProps = {
  name: string
  placeholder: string
  autocomplete?: string
  type?: 'text' | 'password',
  onChange: (e: ChangeEvent) => void
  value: string
  showError?: boolean
  error?: string
}

export function Input(
  {
    placeholder,
    name,
    autocomplete,
    type = 'text',
    onChange,
    value,
    error = '',
    showError = false
  }: InputProps
) {

  const hasError = showError && error?.length > 0;

  return (
    <>
      <InputWrapper
        error={hasError}
        type={type}
        name={name}
        autoComplete={autocomplete}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {hasError && (
        <ErrorSpan>{error}</ErrorSpan>
      )}
    </>
  )
}
