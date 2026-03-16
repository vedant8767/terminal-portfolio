"use client";

import { useState } from "react";
import BootScreen from "../components/BootScreen";
import Shutdown from "../components/Shutdown";
import Terminal from "../components/Terminal";

export default function Home() {
  const [power, setPower] = useState(false);
  const [booting, setBooting] = useState(false);
  const [shutting, setShutting] = useState(false);

  function togglePower() {
    if (!power) {
      setBooting(true);
    } else {
      setShutting(true);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="p-2 border-b border-green-700 flex justify-between">
        <div className="text-green-400 font-mono">Terminal Portfolio</div>

        <button
          onClick={togglePower}
          className="bg-green-600 px-3 py-1 rounded text-black"
        >
          {power ? "OFF" : "ON"}
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {booting && (
          <BootScreen
            onFinish={() => {
              setBooting(false);
              setPower(true);
            }}
          />
        )}

        {shutting && (
          <Shutdown
            onFinish={() => {
              setShutting(false);
              setPower(false);
            }}
          />
        )}

        {power && !booting && !shutting && <Terminal />}
      </div>
    </div>
  );
}
