import { useState } from 'react';

const playbackRates = [1, 1.2, 1.5, 2];

export function PlaybackRateButton({ player }) {
  let [playbackRate, setPlaybackRate] = useState(playbackRates[0]);

  return (
    <button
      type="button"
      className="group relative flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      onClick={() => {
        setPlaybackRate((rate) => {
          let existingIdx = playbackRates.indexOf(rate);
          let idx = (existingIdx + 1) % playbackRates.length;
          let next = playbackRates[idx];

          player.playbackRate(next);

          return next;
        });
      }}
      aria-label="Playback rate"
    >
      <div className="absolute -inset-4 md:hidden" />
      <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-500 p-2 text-[10px] font-black text-white transition-colors group-hover:bg-slate-700">
        {playbackRate}
        <span className="ml-[1px] flex items-end text-[8px]">x</span>
      </div>
    </button>
  );
}
