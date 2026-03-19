"use client";

import { useState, useRef, useEffect } from "react";
import { runCommand } from "../lib/commands";
import QRCode from "qrcode"
import SystemStats from "./SystemStats";

const COMMANDS = [
  "help","about","projects","skills","contact",
  "ls","cd","cat","clear","theme",
  "time","whoami","pwd",
  "age","calendar","coin","qr","sysinfo","random"
]

export default function Terminal({ onPowerOff }) {
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

    // 🔴 Handle power off
    if (typeof output === "object" && output.type === "poweroff") {
      onPowerOff()
      return
    }

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

    if (e.key === "Tab") {
  e.preventDefault()

  const matches = COMMANDS.filter(cmd =>
    cmd.startsWith(input.toLowerCase())
  )

  if (matches.length === 1) {
    setInput(matches[0])
  } else if (matches.length > 1) {
    setHistory(prev => [
      ...prev,
      `Suggestions: ${matches.join("  ")}`
    ])
  }
}
  }

  function QRCodeBlock({ value }) {
    const [src, setSrc] = useState("")

    useEffect(() => {
      QRCode.toDataURL(value).then(setSrc)
    }, [value])

    return (
      <div className="my-2">
        <img src={src} alt="qr" className="w-32 h-32" />
        <div className="text-xs mt-1">{value}</div>
      </div>
    )
  }

  return (
    <div
      className="text-gray-300 font-mono p-4 h-full overflow-y-auto overflow-x-hidden"
      onClick={() => inputRef.current?.focus()} // click anywhere to focus
    >
      <div>
        <div className="flex flex-col justify-start items-start">
          <pre className="text-gray-300 text-[10px] lg:text-sm">
            {`
██╗   ██╗███████╗██████╗  █████╗ ███╗   ██╗████████╗
██║   ██║██╔════╝██╔══██╗██╔══██╗████╗  ██║╚══██╔══╝
██║   ██║█████╗  ██║  ██║███████║██╔██╗ ██║   ██║   
╚██╗ ██╔╝██╔══╝  ██║  ██║██╔══██║██║╚██╗██║   ██║   
 ╚████╔╝ ███████╗██████╔╝██║  ██║██║ ╚████║   ██║   
  ╚═══╝  ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   
                                                    
`}
          </pre>
          <p className="mb-4  font-bold">Welcome to Vedant's Terminal Portfolio</p>
        </div>
        <p className="mb-5">
          Type <span className="text-gray-400">'help'</span> to view commands
        </p>
      </div>
      {history.map((line, i) => {

        // QR output
        if (typeof line === "object" && line.type === "qr") {
          return (
            <QRCodeBlock key={i} value={line.value} />
          )
        }

        if (typeof line === "object" && line.type === "sysinfo") {
          return <SystemStats key={i} />
        }

        return (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        )
      })}

      <div className="flex flex-col w-full">
        <div className="flex">
          <span className="text-gray-400 font-semibold">vedant@portfolio:{cwd}$</span>

          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none flex-1 ml-2 text-white"
          />
        </div>
      </div>

      <div ref={endRef} />
    </div>
  );
}
