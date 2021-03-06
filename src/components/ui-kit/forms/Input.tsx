import React, {ChangeEvent, FocusEvent} from "react";
import styled from "astroturf";

const InputWrapper = styled.div`
  position: relative;
`;

const InputElement = styled.input<{ error: boolean }>`
  width: 100%;
  margin-top: 20px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid rgba(196, 196, 196, 0.7);
  background-color: rgba(248, 248, 248, 0.5);
  padding-left: 12px;
  font-size: 14px;
  line-height: 30px;
  outline: none;
  &:focus {
    border-color: rgba(79, 172, 254, 0.7);
    box-shadow: 0 0 1px 1px #45a5f9;
  }
  &.error {
    border-color: #EB7575;
  }
`;

const ErrorWrapper = styled.div`
  color: #EB7575;
  font-size: 14px;
  position: absolute;
  text-transform: lowercase;
`;

type InputProps = {
  name: string
  placeholder?: string
  autocomplete?: string
  type?: 'text' | 'password',
  onChange: (e: ChangeEvent) => void
  onBlur?: (event: FocusEvent) => void
  value: string
  showError?: boolean
  error?: string
  required?: boolean
}

export function Input(
  {
    name,
    autocomplete,
    placeholder = '',
    type = 'text',
    onChange,
    onBlur,
    value,
    error = '',
    showError = false,
    required = false
  }: InputProps
) {

  const hasError = showError && error?.length > 0;

  return (
    <InputWrapper>
      <InputElement
        error={Boolean(hasError)}
        type={type}
        name={name}
        autoComplete={autocomplete}
        placeholder={placeholder + (required ? ' *' : '')}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {hasError && (
        <ErrorWrapper>{error}</ErrorWrapper>
      )}
    </InputWrapper>
  )
}
