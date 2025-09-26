import { useDropzone } from "react-dropzone";

interface IProps {
    onFileAccepted: (file: File | null) => void;
}

const UploadInput = (props: IProps) => {

    const { onFileAccepted } = props;

    const handleOnDrop = (acceptedFiles: File[]) => {

        if (acceptedFiles.length === 0) {
            onFileAccepted(null);
            return;
        }

        onFileAccepted(acceptedFiles.at(-1) ?? null);

    }

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: handleOnDrop,
        accept: { "image/*": [] },
    });

    return (
        <div {...getRootProps({ className: 'z-10' })}>
            <input {...getInputProps()} />
            <div className="flex items-center justify-center rounded-md border-2 border-dashed border-blue-400 p-4">
                <p>
                    Drag &pos;n&pos; drop some files here, or click to select files
                </p>
            </div>
            {
                acceptedFiles.length > 0 && (
                    <p>File Selected: {acceptedFiles[0].name}</p>
                )
            }
        </div>
    )
}

export default UploadInput;