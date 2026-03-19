"use client";

import { IoMdPower } from "react-icons/io";

export default function SuspendedScreen({ onPowerOn }) {
    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-gray-200 font-mono">

            {/* Title */}
            <div className="text-lg mb-4 uppercase tracking-widest">
                [ System Suspended ]
            </div>

            {/* Message */}
            <div className="mb-8 text-xl">
                Awaiting user reactivation
                <span className="ml-1 animate-blink">_</span>
            </div>

            {/* Power Button */}
            <button
                onClick={onPowerOn}
                className="p-4 rounded-full cursor-pointer transition-all duration-300 
                   hover:scale-105 
                   hover:shadow-[0_0_20px_#22c55e]
                   shadow-[0_0_8px_#22c55e]"
            >
                <IoMdPower size={60} className="text-gray-400" />
            </button>

        </div>
    );
}