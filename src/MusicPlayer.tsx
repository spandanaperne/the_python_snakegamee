import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { tracks } from './musicData';
import { cn } from './lib/utils';

interface MusicPlayerProps {
  className?: string;
}

export const MusicPlayer = ({ className }: MusicPlayerProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play error", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleEnded = () => {
    handleNext();
  };

  return (
    <div className={cn("bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex flex-col items-center", className)}>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleEnded}
      />
      
      <div className="w-full flex-col flex items-center mb-6">
        <div className="relative group w-32 h-32 mb-4">
           {/* Decorative spinning vinyl/CD */}
          <div className={cn(
            "w-full h-full rounded-full border-4 border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-gradient-to-tr from-cyan-900 to-purple-900 flex items-center justify-center transition-transform duration-1000",
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
          )}>
             <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-500/50" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent truncate max-w-[200px]">
            {currentTrack.title}
          </h2>
          <p className="text-cyan-600/70 text-sm mt-1">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <button 
          onClick={handlePrev}
          className="text-cyan-500 hover:text-cyan-300 transition-colors p-2 rounded-full hover:bg-cyan-500/10"
        >
          <SkipBack size={24} />
        </button>
        
        <button 
          onClick={togglePlay}
          className="bg-cyan-500 hover:bg-cyan-400 text-black p-4 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all hover:scale-105"
        >
          {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
        </button>
        
        <button 
          onClick={handleNext}
          className="text-cyan-500 hover:text-cyan-300 transition-colors p-2 rounded-full hover:bg-cyan-500/10"
        >
          <SkipForward size={24} />
        </button>
      </div>

      <div className="w-full flex items-center gap-3 px-2">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="text-cyan-500/70 hover:text-cyan-400"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-1 bg-cyan-900 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>
    </div>
  );
};
