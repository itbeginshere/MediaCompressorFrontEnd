import LinearLoading from "components/indicators/loading/LinearLoading";
import { useAppForm } from "hooks/form";
import { ImageResize } from "models/image/imageResize";
import { FormEvent, useState } from "react";
import ImageHttpService from "services/http/imageHttpService";
import FileDownloadHelper from "utils/fileDownloadHelper";
import FormErrorBulider from "utils/formHelper";
import FormHelper from "utils/formHelper";

interface ImageResizeFormValues extends Omit<ImageResize, 'file'> {
    file : File | null;
}

const ImageResizeForm = () => {

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const form = useAppForm({
        defaultValues: {
            file: null, 
            width: 0, 
            height: 0, 
        } as ImageResizeFormValues,
        validators: {
            onChange: ({ value }) => {
                const formErrorBuilder = new FormErrorBulider<ImageResizeFormValues>();
                                
                if (value.file == null) {
                    formErrorBuilder.append('file', 'A file is required')
                }
                
                if (value.width <= 0) {
                    formErrorBuilder.append('width', 'Width must be greater than 0')
                }
                
                if (value.height > 100) {
                    formErrorBuilder.append('height', 'Height must be greater than 0')
                }

                return formErrorBuilder.errors;
            }
        },
        onSubmit: async ({ value }) => {
                
            const payload : ImageResize = {
                width: value.width, 
                height: value.height, 
                file: value.file!,
            }
    
            setIsProcessing(true);
        
            const response = await ImageHttpService.resize(payload);
        
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
        <form onSubmit={handleFormSubmit}>
            <LinearLoading loading={isProcessing} />
            <form.AppField 
                name="file"
                children={(field) => <field.FormUploadFileField />}
            />
            <form.AppField 
                name="width"
                children={(field) => <field.FormTextField label={'Width'} type={"number"} />}
            />
            <form.AppField 
                name="height"
                children={(field) => <field.FormTextField label={'Height'} type={"number"} />}
            />
            <form.AppForm>
                <form.FormSubscribeButton label={'Submit'} />
            </form.AppForm>
        </form>
    );

}

export default ImageResizeForm;