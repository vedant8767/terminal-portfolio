"use client";

import { useEffect, useState } from "react";

const messages = [
  "[OK] Saving session...",
  "[OK] Closing connections...",
  "[OK] Stopping system...",
  "[OK] Thank you for visiting.",
];

export default function Shutdown({ onFinish }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setLines((prev) => [...prev, messages[i]]);
      i++;

      if (i === messages.length) {
        clearInterval(interval);

        setTimeout(() => onFinish(), 1000);
      }
    }, 600);
  }, []);

  return (
    <div className="text-gray-300 p-4">
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}
