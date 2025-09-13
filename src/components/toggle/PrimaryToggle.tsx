import React, { useRef, useLayoutEffect, useState } from "react";

interface IProps {
    value: boolean;
    leftOption: string;
    rightOption: string;
    onChange: (value: boolean) => void;
}

const PrimaryToggle = ({ value, leftOption, rightOption, onChange }: IProps) => {
  
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const [leftWidth, setLeftWidth] = useState(0);
    const [rightWidth, setRightWidth] = useState(0);

    useLayoutEffect(() => {
        if (leftRef.current) setLeftWidth(leftRef.current.offsetWidth);
        if (rightRef.current) setRightWidth(rightRef.current.offsetWidth);
    }, [leftOption, rightOption]);

    const handleOnChange = () => {
        onChange(!value);
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
                width: value ? leftWidth : rightWidth,
                left: value ? "0.5rem" : `calc(100% - ${rightWidth}px - 0.5rem)`,
                }}
            />

            {/* Left option */}
            <div
                ref={leftRef}
                className={`relative z-10 px-4 py-2 rounded-md transition-colors duration-300 ${
                value ? "text-white" : "text-black"
                }`}
            >
                {leftOption}
            </div>

            {/* Right option */}
            <div
                ref={rightRef}
                className={`relative z-10 px-4 py-2 rounded-md transition-colors duration-300 ${
                !value ? "text-white" : "text-black"
                }`}
            >
                {rightOption}
            </div>
        </div>
    );
};

export default PrimaryToggle;
