import NumberInput from "components/input/NumberInput";
import PrimaryButton from "components/button/PrimaryButton";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadContainer from "components/upload/UploadContainer";
import UploadInput from "components/upload/UploadInput";
import PrimaryToggle from "components/toggle/PrimaryToggle";
import Blob from "components/shapes/Blob";
import FloatingRectangle from "components/shapes/FloatingRectangle";
import { SHAPE_COLORS, SHAPE_BLOB_OATHS, SHAPE_RECTANGLE_CONFIGS, BLOB_CONFIGS } from "constants/constants";

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
    <section className="relative flex flex-col h-screen overflow-hidden bg-gradient-to-b from-white to-gray-100">
       {
        operationToggle && BLOB_CONFIGS.map((cfg, i) => (
          <Blob
            key={i}
            size={cfg.size}
            color={cfg.color}
            initialPosition={cfg.initialPosition}
            path={cfg.path}
          />
        ))
      }
      {
        !operationToggle && SHAPE_RECTANGLE_CONFIGS.map((cfg, i) => (
          <FloatingRectangle
            key={i}
            width={cfg.width}
            height={cfg.height}
            color={cfg.color}
            initialPosition={cfg.initialPosition}
          />
        ))
      }
      <div className="flex-[1]"></div>
      <UploadContainer 
        rootProps={getRootProps({className: "flex flex-col flex-[4] gap-4 items-center justify-start z-20"})} 
        isDragActive={isDragActive}
      >
        <div className="bg-purple-50 border-2 border-purple-700 p-10 flex flex-col justify-center gap-4 rounded-lg">
          <PrimaryToggle
            leftOption="Compress"
            rightOption="Resize"
            value={operationToggle}
            onChange={handleOnOperationToggle}
          />
          <UploadInput inputProps={getInputProps()} />
          {
            !operationToggle && (
              <>
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
              </>
            )
          }
          {
            operationToggle && (
              <NumberInput 
                name="quality" 
                value={quality} 
                onChange={handleQualityChange}
              />
            )
          }
          <PrimaryButton
              text="PROCESS"
              type="submit"
              onClick={handleProcessClick}
          />
        </div>
      </UploadContainer>
    </section>
  )
}

export default App;
