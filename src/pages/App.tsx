import { useState } from "react";
import PrimaryToggle from "components/toggle/PrimaryToggle";
import Blob from "components/shapes/Blob";
import FloatingRectangle from "components/shapes/FloatingRectangle";
import { BLOB_CONFIGS, SHAPE_RECTANGLE_CONFIGS } from "constants/shape_constants";
import ImageCompressForm from "components/forms/images/compress/CompressForm";
import ImageResizeForm from "components/forms/images/resize/ResizeForm";

type ProcessOptions = 'Compress' | 'Resize';

function App() {

  const [currentOption, setOptionToggle] = useState<ProcessOptions>('Compress');

  const handleOnOptionToggle = (value : ProcessOptions) => {
    setOptionToggle(value);
  }

  return (
    <section className="relative flex flex-col h-screen overflow-hidden bg-gradient-to-b from-white to-gray-100">
       {
        currentOption === 'Compress' && BLOB_CONFIGS.map((cfg, i) => (
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
        currentOption === 'Resize' && SHAPE_RECTANGLE_CONFIGS.map((cfg, i) => (
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
      <div className="bg-purple-50 border-2 border-purple-700 p-10 flex flex-col justify-center gap-4 rounded-lg">
        <PrimaryToggle<ProcessOptions>
          leftOption="Compress"
          rightOption="Resize"
          currentOption={currentOption}
          onChange={handleOnOptionToggle}
        />
       <ImageCompressForm />
       <ImageResizeForm />
      </div>
    </section>
  )
}

export default App;
