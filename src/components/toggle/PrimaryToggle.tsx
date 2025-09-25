import { useRef, useLayoutEffect, useState } from "react";

interface IProps<T> {
    currentOption: T;
    leftOption: T;
    rightOption: T;
    onChange: (value: T) => void;
}

const PrimaryToggle = <T extends string,>(props : IProps<T>) => {
  
    const { currentOption, leftOption, rightOption, onChange } = props;

    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const [leftWidth, setLeftWidth] = useState(0);
    const [rightWidth, setRightWidth] = useState(0);

    useLayoutEffect(() => {
        if (leftRef.current) setLeftWidth(leftRef.current.offsetWidth);
        if (rightRef.current) setRightWidth(rightRef.current.offsetWidth);
    }, [leftOption, rightOption]);

    const handleOnChange = () => {
        onChange(currentOption === leftOption ? rightOption : leftOption);
    };

    return (
        <div
            className="relative flex w-fit rounded-lg gap-4 bg-purple-200 p-2 cursor-pointer select-none"
            onClick={handleOnChange}
        >
            {/* Animated slider */}
            <div
                className="absolute top-2 bottom-2 rounded-md bg-purple-400 transition-all duration-300 ease-in-out"
                style={{
                    width: currentOption === leftOption  ? leftWidth : rightWidth,
                    left: currentOption === leftOption  ? "0.5rem" : `calc(100% - ${rightWidth}px - 0.5rem)`,
                }}
            />

            {/* Left option */}
            <div
                ref={leftRef}
                className={`relative z-10 px-4 py-2 rounded-md transition-colors duration-300 text-lg ${
                    currentOption === leftOption  ? "text-white font-semibold" : "text-black font-medium"
                }`}
            >
                {leftOption}
            </div>

            {/* Right option */}
            <div
                ref={rightRef}
                className={`relative z-10 px-4 py-2 rounded-md transition-colors duration-300 text-lg ${
                    currentOption === rightOption ? "text-white font-semibold" : "text-black font-medium"
                }`}
            >
                {rightOption}
            </div>
        </div>
    );
};

export default PrimaryToggle;
