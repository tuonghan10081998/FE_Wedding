import { useEffect, useState } from "react";
import "./layoutEven.css";

export default function BlingDot() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(false);
      setTimeout(() => setActive(true), 50); // restart animation
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${active ? "bling-dot" : ""} w-5 h-5 rounded-full bg-red-600`}
      ></div>
    </div>
  );
}
