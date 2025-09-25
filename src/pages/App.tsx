import { useState } from "react";
import PrimaryToggle from "components/toggle/PrimaryToggle";
import CompressRectangle from "components/shapes/CompressRectangle";
import ResizeRectangle from "components/shapes/ResizeRectangle";
import { BLOB_CONFIGS, SHAPE_RECTANGLE_CONFIGS } from "constants/shape_constants";
import ImageCompressForm from "components/forms/images/compress/CompressForm";
import ImageResizeForm from "components/forms/images/resize/ResizeForm";
import { ToastContainer } from "react-toastify";

type ProcessOptions = 'Compress' | 'Resize';

function App() {

  const [currentOption, setOptionToggle] = useState<ProcessOptions>('Compress');

  const handleOnOptionToggle = (value : ProcessOptions) => {
    setOptionToggle(value);
  }

  return (
    <section className="relative flex flex-col justify-center items-center h-screen overflow-hidden bg-gradient-to-b from-white to-gray-100">
       {
        currentOption === 'Compress' && BLOB_CONFIGS.map((cfg, i) => (
          <CompressRectangle
            key={i}
            size={cfg.size}
            color={cfg.color}
            initialPosition={cfg.initialPosition}
          />
        ))
      }
      {
        currentOption === 'Resize' && SHAPE_RECTANGLE_CONFIGS.map((cfg, i) => (
          <ResizeRectangle
            key={i}
            width={cfg.width}
            height={cfg.height}
            color={cfg.color}
            initialPosition={cfg.initialPosition}
          />
        ))
      }
      <div className="bg-purple-50 border-2 border-purple-700 p-10 flex flex-col justify-center gap-4 rounded-lg max-w-lg z-0">
        <PrimaryToggle<ProcessOptions>
          leftOption="Compress"
          rightOption="Resize"
          currentOption={currentOption}
          onChange={handleOnOptionToggle}
        />
        {
          currentOption === 'Compress' &&  (
            <ImageCompressForm />
          )
        }
         {
          currentOption === 'Resize' &&  (
            <ImageResizeForm />
          )
        }
      </div>
       <ToastContainer />
    </section>
  )
}

export default App;
