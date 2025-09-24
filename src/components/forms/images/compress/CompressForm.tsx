import { AnyFieldApi } from "@tanstack/react-form";
import {} from "@tanstack/react-form";
import { useAppForm } from "hooks/form";
import { ImageCompress } from "models/image/imageCompress";
import { ChangeEvent, FormEvent, useState } from "react";
import ImageHttpService from "services/http/imageHttpService";
import FileDownloadHelper from "utils/fileDownloadHelper";

interface IProps {
    file : File | null;
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

interface ImageCompressFormValues extends Omit<ImageCompress, 'file'> {
    file: File | null;
}

const ImageCompressForm = (props : IProps) => {
    
    const { file } = props;

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const form = useAppForm({
        defaultValues: {
            file: file, 
            quality: 0,
        }, 
        validators: {
            onChange: ({ value }) => {
                const errors = {
                    fields: {},
                } as {
                    fields: Record<string, string>
                };

                if (value.file == null) {
                    errors.fields.file = 'A file is required';
                }

                if (value.quality <= 0) {
                    errors.fields.quality = 'Quality must be greater than 0';
                }

                if (value.quality > 100) {
                    errors.fields.quality = 'Quality must be less than 100';
                }

                return errors;
            },
        },
        onSubmit: async ({ value }) => {
          
            const payload : ImageCompress = {
                quality: value.quality, 
                file: value.file!,
            }
    
            setIsProcessing(true);
        
            const response = await ImageHttpService.compress(payload);
        
            FileDownloadHelper.downloadBlob(response);
        
            setIsProcessing(false);
        }
    })
    return (
        <div>
          <form 
            onSubmit={(event : FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
            }}
          >
                <form.AppField 
                    name="file"
                    children={(field) => <field.FormUploadFileField />}
                />
                <form.AppField 
                    name="quality"
                    children={(field) => <field.FormTextField label={'Quality'} />}
                />
                <form.AppForm>
                    <form.FormSubscribeButton label={'Submit'} />
                </form.AppForm>
          </form>
        </div>
    );
}

export default ImageCompressForm;