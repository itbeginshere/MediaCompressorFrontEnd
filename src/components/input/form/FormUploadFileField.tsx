import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "hooks/formContext";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const FormUploadFileField = () => {

    const field = useFieldContext<File | null>();

    const errors = useStore(field.store, (state) => state.meta.errors);

    const handleOnDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {

        fileRejections.forEach((rej) => {
            toast(`File ${rej.file.name} was rejected. Please only upload images in the following formats: .jpg, .jpeg, .png, .webp, .gif`, { type: "error" });
            rej.errors.forEach((e: FileError) => {
                console.error(`${e.message}`);
            });
        });

        if (acceptedFiles.length === 0) {
            field.handleChange(null);
            return;
        }

        field.handleChange(acceptedFiles.at(-1) ?? null);

    }

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: handleOnDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
            "image/gif": [".gif"],
        },
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} name={field.name} />
            <div className="flex items-center justify-center rounded-md border-2 border-dashed border-blue-400 p-4">
                <p>
                    Drag &pos;n&pos; drop some files here, or click to select files
                </p>
            </div>
            {
                errors.map((error: string) => (
                    <div key={error} style={{ color: 'red' }}>
                        {error}
                    </div>
                ))
            }
            {
                acceptedFiles.length > 0 && (
                    <p className="pt-2">File Selected: {acceptedFiles[0].name}</p>
                )
            }
        </div>
    )
}

export default FormUploadFileField;