import {} from "@tanstack/react-form";
import LinearLoading from "components/indicators/loading/LinearLoading";
import { useAppForm } from "hooks/form";
import { ImageCompress } from "models/image/imageCompress";
import { FormEvent, useState } from "react";
import ImageHttpService from "services/http/imageHttpService";
import FileDownloadHelper from "utils/fileDownloadHelper";

interface ImageCompressFormValues extends Omit<ImageCompress, 'file'> {
    file: File | null;
}

const ImageCompressForm = () => {

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const form = useAppForm({
        defaultValues: {
            file: null, 
            quality: 0,
        } as ImageCompressFormValues, 
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

    const handleFormSubmit = (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
    }

    return (
        <form 
            onSubmit={handleFormSubmit}
        >
            <LinearLoading loading={isProcessing} />
            <form.AppField 
                name="file"
                children={(field) => <field.FormUploadFileField />}
            />
            <form.AppField 
                name="quality"
                children={(field) => <field.FormTextField label={'Quality'} type={"number"} />}
            />
            <form.AppForm>
                <form.FormSubscribeButton label={'Submit'} />
            </form.AppForm>
        </form>
    );
}

export default ImageCompressForm;