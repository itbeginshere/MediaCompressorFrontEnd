import { useState, useEffect, CSSProperties } from "react";

interface IProps {
  size: number;
  color: string;
  initialPosition: { top: string; left: string };
}

const CompressRectangle = (props: IProps) =>  {
  
  const { size, color, initialPosition } = props;
  
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const randomize = () => {
      setStyle({
        top: initialPosition.top,
        left: initialPosition.left,
        width: size,
        height: size,
        borderRadius: "4px",
        position: "absolute",
        backgroundColor: color,
        opacity: 0.5 + Math.random() * 0.5,
        transform: `translate(${Math.random() * 150 - 75}px, ${
          Math.random() * 150 - 75
        }px) scale(${0.5 + Math.random() * 2})`, 
        transition: `transform ${2 + Math.random() * 2}s ease-in-out, opacity ${
          2 + Math.random() * 2
        }s ease-in-out`,
      });
    };

    randomize();
    const interval = setInterval(randomize, 2500); 
    return () => clearInterval(interval);
  }, [initialPosition, size, color]);

  return <div style={style} />;
};

export default CompressRectangle;
