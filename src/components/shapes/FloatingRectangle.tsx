import { useEffect, useState } from "react";

interface Props {
  width: number;
  height: number;
  color: string;
  initialPosition: { top: string; left: string };
}

const FloatingRectangle = ({ width, height, color, initialPosition }: Props) => {
  const [style, setStyle] = useState<any>({});

  useEffect(() => {
    const randomize = () => {
      const scale = 0.7 + Math.random() * 0.6; // shrink/grow between 0.7x and 1.3x
      const xOffset = Math.random() * 150 - 75; // move left/right
      const yOffset = Math.random() * 150 - 75; // move up/down

      setStyle({
        top: initialPosition.top,
        left: initialPosition.left,
        width,
        height,
        backgroundColor: color,
        position: "absolute",
        opacity: 0.25 + Math.random() * 0.25,
        transform: `translate(${xOffset}px, ${yOffset}px) scale(${scale})`,
        transition: `transform ${3 + Math.random() * 4}s ease-in-out, opacity ${3 + Math.random() * 4}s ease-in-out`,
      });
    };

    randomize(); // initial
    const interval = setInterval(randomize, 4000); // move every 4s
    return () => clearInterval(interval);
  }, [initialPosition, width, height, color]);

  return <div style={style} />;
};

export default FloatingRectangle;
