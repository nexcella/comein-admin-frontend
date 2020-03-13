import React from "react";
import styled from "astroturf";
import {useTranslation} from "react-i18next";
import {object as yupObject, string as yupString} from 'yup';
import {useAuthActions, useAuthState} from "./AuthProvider";
import {LoginData} from "../../stores/AuthStore";
import {useFormik} from "formik";
import {Input} from "../ui-kit/forms/Input";
import {Button} from "../ui-kit/Button";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & button {
    margin-top: 35px;
  }
`

export function AuthForm() {
  const authState = useAuthState();
  const authActions = useAuthActions();
  const {t} = useTranslation();

  const validationSchema = yupObject().shape({
    username: yupString().required(t('validation.required')),
    password: yupString().required(t('validation.required'))
  });

  const formik = useFormik<LoginData>({
    validationSchema,
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: ({username, password}) => {
      authActions.login({username, password});
    }
  });

  const isLoading = formik.isSubmitting && authState.isLoading;

  return (
    <FormWrapper onSubmit={formik.handleSubmit}>
      <Input
        value={formik.values.username}
        onChange={formik.handleChange}
        autocomplete='username'
        name='username'
        placeholder={t('label.username')}
        showError={formik.touched.username}
        error={formik.errors.username}
      />
      <Input
        type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        autocomplete='current-password'
        name='password'
        placeholder={t('label.password')}
        showError={formik.touched.password}
        error={formik.errors.password}
      />
      <Button
        disabled={isLoading}
        pending={isLoading}
        text={t('button.login')}
      />
    </FormWrapper>
  )
}
