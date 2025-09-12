import NumberInput from "components/NumberInput";
import PrimaryButton from "components/PrimaryButton";
import { useState } from "react";

function App() {

  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [quality, setQuality] = useState<string>('');

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
    console.log('save')
  } 

  return (
    <div>
      <div>Toggle for compress/resize</div>
      <div>File Upload</div>
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
    </div>
  );
}

export default App;
