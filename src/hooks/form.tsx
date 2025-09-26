
import { createFormHook } from '@tanstack/react-form'
import FormSubscribeButton from 'components/button/form/FormSubscribeButton'
import FormTextField from 'components/input/form/FormTextField.js'
import FormUploadFileField from 'components/input/form/FormUploadFileField'
import { fieldContext, formContext } from './formContext'

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