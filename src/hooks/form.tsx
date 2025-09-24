

import { createFormHook,  FormValidateOrFn, FormAsyncValidateOrFn  } from '@tanstack/react-form'
import FormTextField from 'components/input/form/FormTextField.js'
import { fieldContext, formContext } from './formContext'
import FormSubscribeButton from 'components/button/form/FormSubscribeButton'
import FormUploadFileField from 'components/input/form/FormUploadFileField'

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    FormTextField,
    FormUploadFileField,
  },
  formComponents: {
    FormSubscribeButton,
  },
  fieldContext,
  formContext,
})