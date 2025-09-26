import { CSSProperties, useEffect, useState } from "react";

interface Props {
  width: number;
  height: number;
  color: string;
  initialPosition: { top: string; left: string };
}

const ResizeRectangle = (props: Props) => {

    const { width, height, color, initialPosition } = props;

    const [style, setStyle] = useState<CSSProperties>({});

    useEffect(() => {
        const randomize = () => {
            const scaleX = 0.3 + Math.random() * 2.5; // 0.3x → 2.8x
            const scaleY = 0.3 + Math.random() * 2.5; // 0.3x → 2.8x
            const xOffset = Math.random() * 150 - 75;
            const yOffset = Math.random() * 150 - 75;

            setStyle({
                top: initialPosition.top,
                left: initialPosition.left,
                width,
                height,
                backgroundColor: color,
                position: "absolute",
                opacity: 0.3 + Math.random() * 0.7,
                transform: `translate(${xOffset}px, ${yOffset}px) scale(${scaleX}, ${scaleY})`,
                transition: `transform ${2 + Math.random() * 3}s ease-in-out, 
                     opacity ${2 + Math.random() * 3}s ease-in-out`,
            });
        };

        randomize();
        const interval = setInterval(randomize, 3000);
        return () => clearInterval(interval);
    }, [initialPosition, width, height, color]);

    return <div style={style} />;
};

export default ResizeRectangle;
