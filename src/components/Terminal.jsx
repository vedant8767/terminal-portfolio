"use client";

import { useState, useRef, useEffect } from "react";
import { runCommand } from "../lib/commands";

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);

  const inputRef = useRef(null);
  const endRef = useRef(null);

  // 🔹 Auto focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  // 🔹 Auto scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function handleCommand() {
    if (!input.trim()) return;

    if (input === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = runCommand(input, { cwd, setCwd });

    setHistory((prev) => [
      ...prev,
      `vedant@portfolio:${cwd}$ ${input}`,
      output,
    ]);

    // store command
    setCommandHistory((prev) => [...prev, input]);
    setHistoryIndex(null);

    setInput("");
  }

  // ✅ FIXED: Proper key handler
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleCommand();
    }

    // ⬆️ previous command
    if (e.key === "ArrowUp") {
      if (commandHistory.length === 0) return;

      const newIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    // ⬇️ next command
    if (e.key === "ArrowDown") {
      if (commandHistory.length === 0) return;

      if (historyIndex === null) return;

      const newIndex =
        historyIndex >= commandHistory.length - 1 ? null : historyIndex + 1;

      setHistoryIndex(newIndex);
      setInput(newIndex === null ? "" : commandHistory[newIndex]);
    }
  }

  return (
    <div
      className="text-green-400 font-mono p-4 h-full overflow-y-auto"
      onClick={() => inputRef.current?.focus()} // click anywhere to focus
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}

      <div className="flex">
        <span>vedant@portfolio:{cwd}$</span>

        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // ✅ FIXED HERE
          className="bg-transparent outline-none flex-1 ml-2"
        />
      </div>

      <div ref={endRef} />
    </div>
  );
}
