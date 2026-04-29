import { useSnakeGame } from './useSnakeGame';
import { cn } from './lib/utils';
import { Trophy, PlayCircle, PauseCircle } from 'lucide-react';

export const SnakeGame = () => {
  const { snake, food, score, gameOver, resetGame, gridSize, isPaused } = useSnakeGame();

  return (
    <div className="flex flex-col items-center">
      {/* Header/Scoreboard */}
      <div className="w-full flex justify-between items-center mb-6 px-4 py-3 bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.15)]">
        <div className="flex items-center gap-2">
          <Trophy className="text-purple-400" size={20} />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SCORE: {score}
          </span>
        </div>
        <div className="text-purple-400/50 text-sm font-mono flex items-center gap-2">
          {isPaused ? <PauseCircle size={16} /> : <PlayCircle size={16} />}
          {isPaused ? "PAUSED" : "PLAYING"}
        </div>
      </div>

      {/* Game Board */}
      <div className="relative">
        {/* Glow effect slightly larger than the board */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 to-cyan-600 rounded-xl blur opacity-30"></div>
        
        <div 
          className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            width: 'min(90vw, 500px)',
            height: 'min(90vw, 500px)',
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const x = i % gridSize;
            const y = Math.floor(i / gridSize);
            
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className={cn(
                  "w-full h-full border-[0.5px] border-slate-900/30",
                  isHead && "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10 rounded-sm",
                  isSnake && !isHead && "bg-cyan-600/80 shadow-[0_0_5px_rgba(8,145,178,0.5)] rounded-sm scale-95",
                  isFood && "bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.8)] rounded-full scale-75 animate-pulse",
                )}
              />
            );
          })}
        </div>

        {/* Overlay for Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-20">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 mb-2 drop-shadow-lg">
              SYSTEM FAILURE
            </h2>
            <p className="text-pink-400 mb-8 font-mono">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              REBOOT_
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-slate-500 text-xs font-mono text-center flex flex-col gap-1">
        <p>Use [ARROW KEYS] or [W A S D] to navigate</p>
        <p>Press [SPACE] to pause/resume</p>
      </div>
    </div>
  );
};
