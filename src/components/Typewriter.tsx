import { useState, useEffect } from "react";

type TypewriterProps = {
  text: string;
  speed?: number;
};

function Typewriter({ text, speed = 80 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="inline-block whitespace-pre-line">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default Typewriter;
