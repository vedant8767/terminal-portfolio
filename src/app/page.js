"use client";

import { useEffect, useState } from "react";
import BootScreen from "../components/BootScreen";
import Shutdown from "../components/Shutdown";
import Terminal from "../components/Terminal";
import SystemInfo from "@/components/SystemInfo";

export default function Home() {
  const [power, setPower] = useState(false);
  const [booting, setBooting] = useState(false);
  const [shutting, setShutting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handler);

    return () => {
      document.removeEventListener("fullscreenchange", handler);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

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
        <SystemInfo />
        <button
          onClick={togglePower}
          className="bg-green-600 px-3 py-1 rounded text-black"
        >
          {power ? "OFF" : "ON"}
        </button>
        <div className="flex gap-2">
          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="bg-yellow-500 px-3 py-1 rounded text-black"
          >
            {isFullscreen ? "Exit Full" : "Full"}
          </button>

          {/* Power Button */}
          <button
            onClick={togglePower}
            className="bg-green-600 px-3 py-1 rounded text-black"
          >
            {power ? "OFF" : "ON"}
          </button>
        </div>
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
