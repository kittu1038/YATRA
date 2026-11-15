import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientSoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSound, setActiveSound] = useState('ganga');
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscRef = useRef([]);

  const toggleSound = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio(activeSound);
    }
  };

  const startAudio = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'ganga' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(type === 'ganga' ? 420 : 280, ctx.currentTime);

      noise.connect(filter);
      filter.connect(masterGain);
      noise.start();
      oscRef.current = [noise];

      setIsPlaying(true);
    } catch (e) {
      console.log('Audio init prevented:', e);
    }
  };

  const stopAudio = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-xs font-semibold shadow-2xs">
      <button
        onClick={toggleSound}
        className="flex items-center gap-1.5 text-[#4B5563] hover:text-[#008CFF] transition-colors cursor-pointer"
        title="Toggle Ambient Soundscape"
      >
        {isPlaying ? <Volume2 size={15} className="text-[#008CFF] animate-pulse" /> : <VolumeX size={15} className="text-[#9CA3AF]" />}
        <span className="hidden md:inline">
          {isPlaying ? 'Sound On' : 'Sound'}
        </span>
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1 text-[11px] ml-1">
          <button
            onClick={() => {
              stopAudio();
              setActiveSound('ganga');
              setTimeout(() => startAudio('ganga'), 100);
            }}
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeSound === 'ganga' ? 'bg-[#008CFF] text-white' : 'bg-white text-[#4B5563] border border-[#E5E7EB]'}`}
          >
            Ganga
          </button>
          <button
            onClick={() => {
              stopAudio();
              setActiveSound('himalaya');
              setTimeout(() => startAudio('himalaya'), 100);
            }}
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeSound === 'himalaya' ? 'bg-[#008CFF] text-white' : 'bg-white text-[#4B5563] border border-[#E5E7EB]'}`}
          >
            Wind
          </button>
        </div>
      )}
    </div>
  );
}
