import React from "react";
import styled from "astroturf";
import {useTranslation} from "react-i18next";
import {object as yupObject, string as yupString} from 'yup';
import {useAuthActions, useAuthState} from "./AuthProvider";
import {RegisterData} from "../../stores/AuthStore";
import {useFormik} from "formik";
import {Input} from "../ui-kit/forms/Input";
import {Button} from "../ui-kit/Button";
import {ErrorLabel} from "../error/ErrorLabel";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  & > div:first-child input {
    margin-top: 0;
  }
  & button {
    margin-top: 35px;
  }
`

export function RegisterForm() {
  const authState = useAuthState();
  const authActions = useAuthActions();
  const {t} = useTranslation();

  const validationSchema = yupObject().shape({
    name: yupString().required(t('validation.required')),
    username: yupString().required(t('validation.required')).email(t('validation.email')),
    password: yupString().required(t('validation.required'))
  });

  const formik = useFormik<RegisterData>({
    validateOnChange: true,
    validationSchema,
    initialValues: {
      name: '',
      username: '',
      phone: '',
      password: ''
    },
    onSubmit: (registerData) => {
      authActions.usernameRegister(registerData);
    }
  });

  const isLoading = formik.isSubmitting && authState.isLoading;
  const isValid = formik.dirty && formik.isValid;

  return (
    <FormWrapper onSubmit={formik.handleSubmit}>
      <Input
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        autocomplete='name'
        name='name'
        placeholder={t('label.name')}
        showError={formik.touched.name}
        error={formik.errors.name}
        required
      />
      <Input
        value={formik.values.username}
        onChange={formik.handleChange}
        autocomplete='username'
        name='username'
        placeholder={t('label.username')}
        showError={formik.touched.username}
        error={formik.errors.username}
        onBlur={formik.handleBlur}
        required
      />
      <Input
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        autocomplete='phone'
        name='phone'
        placeholder={t('label.phone')}
        showError={formik.touched.phone}
        error={formik.errors.phone}
      />
      <Input
        type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        autocomplete='current-password'
        name='password'
        placeholder={t('label.password')}
        showError={formik.touched.password}
        error={formik.errors.password}
        required
      />
      {authState.error && <ErrorLabel text={t(`errors.${authState.error}`)}/>}
      <Button
        disabled={!isValid || isLoading}
        pending={isLoading}
        text={t('button.register')}
      />
    </FormWrapper>
  )
}
