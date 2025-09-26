import LinearLoading from "components/indicators/loading/LinearLoading";
import { useAppForm } from "hooks/form";
import { ImageResize } from "models/image/imageResize";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import ImageHttpService from "services/http/imageHttpService";
import FileDownloadHelper from "utils/fileDownloadHelper";
import FormErrorBulider from "utils/formHelper";

interface ImageResizeFormValues extends Omit<ImageResize, 'file'> {
    file: File | null;
}

const ImageResizeForm = () => {

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const form = useAppForm({
        defaultValues: {
            file: null,
            width: 1920,
            height: 1080,
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

                if (value.height <= 0) {
                    formErrorBuilder.append('height', 'Height must be greater than 0')
                }

                return formErrorBuilder.errors;
            }
        },
        onSubmit: async ({ value }) => {

            try {

                const payload: ImageResize = {
                    width: value.width,
                    height: value.height,
                    file: value.file!,
                }

                setIsProcessing(true);

                const response = await ImageHttpService.resize(payload);

                FileDownloadHelper.downloadBlob(response);

                setIsProcessing(false);
            } catch (error) {
                toast("An error occurred while resizing the image", { type: "error" });
                console.error(error);
            } finally {
                setIsProcessing(false);
            }

        }
    })

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
    }

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleFormSubmit}
        >
            <LinearLoading loading={isProcessing} />
            <form.AppField
                name="file"
            >
                {(field) => <field.FormUploadFileField />}
            </form.AppField>

            <form.AppField
                name="width"
            >
                {(field) => <field.FormTextField label={'Width'} type={"number"} min={1} />}
            </form.AppField>

            <form.AppField
                name="height"
            >
                {(field) => <field.FormTextField label={'Height'} type={"number"} min={1} />}
            </form.AppField>

            <form.AppForm>
                <form.FormSubscribeButton label={'Submit'} />
            </form.AppForm>
        </form>
    );

}

export default ImageResizeForm;