import LinearLoading from "components/indicators/loading/LinearLoading";
import { useAppForm } from "hooks/form";
import { ImageCompress } from "models/image/imageCompress";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import ImageHttpService from "services/http/imageHttpService";
import FileDownloadHelper from "utils/fileDownloadHelper";
import FormErrorBulider from "utils/formHelper";

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
                
                const formErrorBuilder = new FormErrorBulider<ImageCompressFormValues>();
                
                if (value.file == null) {
                    formErrorBuilder.append('file', 'A file is required')
                }
                
                if (value.quality <= 0) {
                    formErrorBuilder.append('quality', 'Quality must be greater than 0')
                }
                
                if (value.quality > 100) {
                    formErrorBuilder.append('quality', 'Quality must be less than 100')
                }

                return formErrorBuilder.errors;
            },
        },
        onSubmit: async ({ value }) => {
          
            try {
                const payload : ImageCompress = {
                    quality: value.quality, 
                    file: value.file!,
                }
        
                setIsProcessing(true);
            
                const response = await ImageHttpService.compress(payload);
            
                FileDownloadHelper.downloadBlob(response);
            
                setIsProcessing(false);
            } catch(error) {
                toast("An error occurred while compressing the image", { type: "error" });
                console.error(error);
            } finally {
                setIsProcessing(false);
            }

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