"use client";

import { useEffect, useState } from "react";
import BootScreen from "../components/BootScreen";
import Shutdown from "../components/Shutdown";
import Terminal from "../components/Terminal";
import SystemInfo from "@/components/SystemInfo";
import SuspendedScreen from "@/components/SuspendedScreen";

import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { IoMdPower } from "react-icons/io";

export default function Home() {
  const [power, setPower] = useState(null); // 🔥 important (null initially)
  const [booting, setBooting] = useState(false);
  const [shutting, setShutting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ✅ Load power state
  useEffect(() => {
    const saved = localStorage.getItem("system_power");

    if (saved === null) {
      // first time → boot
      setPower(true);
      setBooting(true);
    } else {
      const isOn = saved === "true";
      setPower(isOn);

      if (isOn) {
        setBooting(true);
      }
    }
  }, []);

  // ✅ Save power state
  useEffect(() => {
    if (power !== null) {
      localStorage.setItem("system_power", power);
    }
  }, [power]);

  // ✅ Fullscreen sync
  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handler);
    return () =>
      document.removeEventListener("fullscreenchange", handler);
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
      setPower(true);
    } else {
      setShutting(true);
    }
  }

  // ⛔ wait until state loads
  if (power === null) return null;

  return (
    <div className="h-screen flex flex-col bg-black text-gray-300">

      {/* 🔝 TOP BAR (only when ON) */}
      {power && !booting && !shutting && (
        <div className="p-2 border-b border-white flex justify-between items-center">
          <SystemInfo />

          <div className="flex gap-3">
            <button className="cursor-pointer" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <MdFullscreenExit size={26} />
              ) : (
                <MdFullscreen size={26} />
              )}
            </button>

            <button className="cursor-pointer" onClick={togglePower}>
              <IoMdPower size={22} />
            </button>
          </div>
        </div>
      )}

      {/* 🧠 MAIN */}
      <div className="flex-1 overflow-hidden">

        {/* 🟢 BOOT */}
        {booting && (
          <BootScreen
            onFinish={() => {
              setBooting(false);
              setPower(true);
            }}
          />
        )}

        {/* 🔴 SHUTDOWN */}
        {shutting && (
          <Shutdown
            onFinish={() => {
              setShutting(false);
              setPower(false);
            }}
          />
        )}

        {/* ⚡ SUSPENDED */}
        {!power && !booting && !shutting && (
          <SuspendedScreen
            onPowerOn={() => {
              setBooting(true);
              setPower(true);
            }}
          />
        )}

        {/* 💻 TERMINAL */}
        {power && !booting && !shutting && (
          <Terminal onPowerOff={() => setShutting(true)} />
        )}
      </div>
      <div className="p-2 flex  justify-center items-center border-t border-white">
        &copy; Vedant Bhadkamkar | All Rights Reserved
      </div>
    </div>
  );
}