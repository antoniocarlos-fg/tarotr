import { useState, type MouseEvent } from "react";
import menuCard from "../assets/images/menu-card.png";

type TarotCardProps = {
  onClick: () => void;
};

export default function TarotCard({ onClick }: TarotCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: -y * 20,
      y: x * 20,
    });
  }

  function handleMouseLeave() {
    setRotation({ x: 0, y: 0 });
  }

  return (
    <button
      type="button"
      aria-label="Realizar tiragem de tarô"
      className="block w-50 cursor-pointer border-0 bg-transparent p-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: "800px" }}
    >
      <img
        src={menuCard}
        alt="Carta de tarô virada para baixo"
        draggable={false}
        className="block w-full select-none transition-transform duration-150 ease-out hover:scale-105 active:scale-100"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      />
    </button>
  );
}
