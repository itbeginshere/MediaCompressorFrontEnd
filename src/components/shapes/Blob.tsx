import { useState, useEffect } from "react";

const Blob = ({ size, color, initialPosition, path }: { size: number; color: string; initialPosition: { top: string; left: string }; path: string }) => {
  const [style, setStyle] = useState<any>({});

  useEffect(() => {
    const randomize = () => {
      setStyle({
        top: initialPosition.top,
        left: initialPosition.left,
        width: size,
        height: size,
        position: "absolute",
        opacity: 0.25 + Math.random() * 0.25,
        transform: `translate(${Math.random() * 120 - 60}px, ${Math.random() * 120 - 60}px) scale(${0.9 + Math.random() * 0.4})`,
        transition: `transform ${6 + Math.random() * 6}s ease-in-out, opacity ${6 + Math.random() * 6}s ease-in-out`,
      });
    };

    randomize();
    const interval = setInterval(randomize, 6000);
    return () => clearInterval(interval);
  }, [initialPosition, size, color]);

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path fill={color} d={path} transform="translate(100 100)" />
    </svg>
  );
};

export default Blob;