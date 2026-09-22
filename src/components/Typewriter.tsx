import { useState, useEffect } from "react";

function Typewriter({ text, speed = 80 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
  setDisplayed("");
  let i = 0;

  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval);
      return;
    }
    setDisplayed((prev) => prev + text[i]);
    i++;
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