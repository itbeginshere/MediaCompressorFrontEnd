import NumberInput from "components/input/NumberInput";
import PrimaryButton from "components/button/PrimaryButton";
import { useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import UploadContainer from "components/upload/UploadContainer";
import UploadInput from "components/upload/UploadInput";
import PrimaryToggle from "components/toggle/PrimaryToggle";

function App() {

  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [quality, setQuality] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [operationToggle, setOperationToggle] = useState<boolean>(false);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const handleWidthChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setWidth(event.target.value);
  }

  const handleHeightChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
  }

  const handleQualityChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setQuality(event.target.value);
  }

  const handleProcessClick = () => {
    console.log('save');
  } 

  const handleOnDrop = (acceptedFiles : File[]) => {
  
    if (acceptedFiles.length === 0) {
      setFile(null);
      return;
    }

    setFile(acceptedFiles[0]);
  
  }

  const handleOnOperationToggle = (value : boolean) => {
    setOperationToggle(value);
  }

  const { getRootProps, getInputProps} = useDropzone({
      onDrop: handleOnDrop,
      noClick: true,
      noKeyboard: true, 
      accept: { "image/*": [] },
      onDragEnter: () => setIsDragActive(true),
      onDragLeave: () => setIsDragActive(false),
      onDropAccepted: () => setIsDragActive(false),
  });

  return (
   <section className="">
      <UploadContainer 
        rootProps={getRootProps({className: "flex flex-col"})} 
        isDragActive={isDragActive}
      >
        <PrimaryToggle
          leftOption="Compress"
          rightOption="Resize"
          value={operationToggle}
          onChange={handleOnOperationToggle}
        />
        <UploadInput inputProps={getInputProps()} />
        <NumberInput 
          name="height" 
          value={height} 
          onChange={handleHeightChange}
        />
        <NumberInput 
          name="width" 
          value={width} 
          onChange={handleWidthChange}
        />
        <NumberInput 
          name="quality" 
          value={quality} 
          onChange={handleQualityChange}
        />
        <PrimaryButton
            text="Process"
            type="submit"
            onClick={handleProcessClick}
        />
      </UploadContainer>
    </section>
  )
}

export default App;
