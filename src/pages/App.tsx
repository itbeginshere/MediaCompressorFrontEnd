import ImageCompressForm from "components/forms/images/compress/CompressForm";
import ImageResizeForm from "components/forms/images/resize/ResizeForm";
import CompressRectangle from "components/shapes/CompressRectangle";
import ResizeRectangle from "components/shapes/ResizeRectangle";
import PrimaryToggle from "components/toggle/PrimaryToggle";
import { BLOB_CONFIGS, SHAPE_RECTANGLE_CONFIGS } from "constants/shape_constants";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

type ProcessOptions = 'Compress' | 'Resize';

function App() {

    const [currentOption, setOptionToggle] = useState<ProcessOptions>('Compress');

    const handleOnOptionToggle = (value: ProcessOptions) => {
        setOptionToggle(value);
    }

    return (
        <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100">
            {
                currentOption === 'Compress' && BLOB_CONFIGS.map((config, index) => (
                    <CompressRectangle
                        key={`compress-rectangle-${index}`}
                        size={config.size}
                        color={config.color}
                        initialPosition={config.initialPosition}
                    />
                ))
            }
            {
                currentOption === 'Resize' && SHAPE_RECTANGLE_CONFIGS.map((config, index) => (
                    <ResizeRectangle
                        key={`resize-rectangle-${index}`}
                        width={config.width}
                        height={config.height}
                        color={config.color}
                        initialPosition={config.initialPosition}
                    />
                ))
            }
            <div className="z-0 flex max-w-lg flex-col items-center justify-center gap-4 rounded-lg border-2 border-purple-700 bg-purple-50 p-10">
                <PrimaryToggle<ProcessOptions>
                    leftOption={"Compress"}
                    rightOption={"Resize"}
                    currentOption={currentOption}
                    onChange={handleOnOptionToggle}
                />
                {
                    currentOption === 'Compress' && (
                        <ImageCompressForm />
                    )
                }
                {
                    currentOption === 'Resize' && (
                        <ImageResizeForm />
                    )
                }
            </div>
            <ToastContainer />
        </section>
    )
}

export default App;
