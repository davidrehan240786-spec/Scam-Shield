"use client";

import * as React from "react";

export const RippleCircles: React.FC = () => {
  return (
    <div className="relative h-full w-full aspect-square flex items-center justify-center pointer-events-none overflow-visible">
      {/* Ripple circles */}
      <span className="absolute inset-[40%] rounded-full border border-white/40 animate-[ripple_2s_infinite_ease-in-out] bg-gradient-to-tr from-white/5 to-white/5 backdrop-blur-sm z-[10]" />
      <span className="absolute inset-[30%] rounded-full border border-white/30 animate-[ripple_2s_infinite_ease-in-out_0.2s] bg-gradient-to-tr from-white/5 to-white/5 backdrop-blur-sm z-[9]" />
      <span className="absolute inset-[20%] rounded-full border border-white/20 animate-[ripple_2s_infinite_ease-in-out_0.4s] bg-gradient-to-tr from-white/5 to-white/5 backdrop-blur-sm z-[8]" />
      <span className="absolute inset-[10%] rounded-full border border-white/15 animate-[ripple_2s_infinite_ease-in-out_0.6s] bg-gradient-to-tr from-white/5 to-white/5 backdrop-blur-sm z-[7]" />
      <span className="absolute inset-0 rounded-full border border-white/10 animate-[ripple_2s_infinite_ease-in-out_0.8s] bg-gradient-to-tr from-white/5 to-white/5 backdrop-blur-sm z-[6]" />
    </div>
  );
};
