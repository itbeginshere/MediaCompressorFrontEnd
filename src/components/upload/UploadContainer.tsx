import { ReactNode } from "react";
import { DropzoneRootProps } from "react-dropzone";

interface IProps {
    rootProps: DropzoneRootProps;
    isDragActive : boolean;
    children ?: ReactNode[];
}

const UploadContainer = (props: IProps) => {
    
    const { rootProps, children, isDragActive } = props;

    return (
        <div 
            {...rootProps} 
            children={children}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                border: isDragActive ? "3px dashed #007bff" : "3px dashed transparent",
                backgroundColor: isDragActive ? "rgba(0, 123, 255, 0.1)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10, 
                pointerEvents: "all",
            }}
        />
    );
}

export default UploadContainer;