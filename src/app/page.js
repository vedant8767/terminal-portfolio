"use client";

import { useEffect, useState } from "react";
import BootScreen from "../components/BootScreen";
import Shutdown from "../components/Shutdown";
import Terminal from "../components/Terminal";
import SystemInfo from "@/components/SystemInfo";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import { IoMdPower } from "react-icons/io";

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
      <div className="p-2 border-b border-gray-300 flex justify-between items-center">
        <SystemInfo />
        <div className="flex gap-2">
          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="cursor-pointer"
          >
            {isFullscreen ? <MdFullscreenExit size={30}/>: <MdFullscreen size={30}/>}
          </button>

          {/* Power Button */}
          <button
            onClick={togglePower}
            className="cursor-pointer"
          >
            {power ? <IoMdPower size={24}/> : <IoMdPower size={24}/>}
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
