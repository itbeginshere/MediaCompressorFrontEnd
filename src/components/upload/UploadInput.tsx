import { DropzoneInputProps } from "react-dropzone"

interface IProps {
    inputProps : DropzoneInputProps;
}

const UploadInput = (props : IProps) => {
    
    const { inputProps } = props;
    
    return (
        <input {...inputProps} />
    )
}

export default UploadInput;