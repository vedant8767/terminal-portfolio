"use client";

import { useEffect, useState } from "react";

const messages = [
  "[OK] Starting system...",
  "[OK] Loading modules...",
  "[OK] Connecting to database...",
  "[OK] Initializing portfolio engine...",
  "[OK] Ready.",
];

export default function BootScreen({ onFinish }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setLines((prev) => [...prev, messages[i]]);
      i++;

      if (i === messages.length) {
        clearInterval(interval);

        setTimeout(() => {
          onFinish();
        }, 1000);
      }
    }, 700);
  }, []);

  return (
    <div className="text-green-400 font-mono p-4">
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}

      <div className="mt-4 w-full bg-gray-800 h-2">
        <div className="bg-green-500 h-2 animate-pulse w-full" />
      </div>
    </div>
  );
}
