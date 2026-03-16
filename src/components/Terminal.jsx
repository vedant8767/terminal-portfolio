"use client";

import { useState } from "react";
import { runCommand } from "../lib/commands";

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");

  function handleCommand() {
    if (!input) return;

    if (input === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = runCommand(input, { cwd, setCwd });

    setHistory([...history, `vedant@portfolio:${cwd}$ ${input}`, output]);

    setInput("");
  }

  return (
    <div className="text-green-400 font-mono p-4 h-full overflow-y-auto">
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}

      <div className="flex">
        <span>vedant@portfolio:{cwd}$</span>

        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand();
            }
          }}
          className="bg-transparent outline-none flex-1 ml-2"
        />
      </div>
    </div>
  );
}
