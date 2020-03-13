import React from "react";
import styled from "astroturf";
import {useTranslation} from "react-i18next";
import {object as yupObject, string as yupString} from 'yup';
import {useAuthActions, useAuthState} from "./AuthProvider";
import {LoginData} from "../../stores/AuthStore";
import {useFormik} from "formik";
import {Input} from "../ui-kit/forms/Input";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  & input {
    
  }
  & button {
    margin-top: 20px;
  }
`

const validationSchema = yupObject().shape({
  username: yupString().required('t.validation.required'),
  password: yupString().required('t.validation.required').min(6),
});

export function AuthForm() {
  const authState = useAuthState();
  const authActions = useAuthActions();
  const {t} = useTranslation();
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

      <button type='submit' disabled={formik.isSubmitting && authState.isLoading}>
        {t('button.login')}
      </button>
    </FormWrapper>
  )
}
