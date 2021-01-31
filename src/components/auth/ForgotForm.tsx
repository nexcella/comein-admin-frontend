import React from "react";
import styled from "astroturf";
import {useTranslation} from "react-i18next";
import {object as yupObject, string as yupString} from 'yup';
import {useAuthStore} from "../../providers/StoreProvider";
import {ForgotData} from "../../stores/AuthStore";
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

export function ForgotForm() {
  const authState = useAuthStore();
  const {t} = useTranslation();

  const validationSchema = yupObject().shape({
    username: yupString().required(t('validation.required')).email(t('validation.email')),
  });

  const formik = useFormik<ForgotData>({
    validateOnChange: true,
    validationSchema,
    initialValues: {
      username: '',
    },
    onSubmit: (forgotData) => {
      authState.usernameForgot(forgotData);
    }
  });

  const isLoading = formik.isSubmitting && authState.isLoading;
  const isValid = formik.dirty && formik.isValid;

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
        onBlur={formik.handleBlur}
        required
      />
      {authState.error && <ErrorLabel text={t(`errors.${authState.error}`)}/>}
      <Button
        disabled={!isValid || isLoading}
        pending={isLoading}
        text={t('button.forgotPassword')}
      />
    </FormWrapper>
  )
}
