import { MusicPlayer } from './MusicPlayer';
import { SnakeGame } from './SnakeGame';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col font-sans overflow-x-hidden">
      {/* Background abstract elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
      </div>

      <main className="relative z-10 flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col xl:flex-row gap-8 xl:gap-12 items-center xl:items-start justify-center">
        
        {/* Left Column: Game */}
        <div className="flex-1 w-full max-w-2xl flex flex-col justify-center">
           <div className="mb-8 text-center xl:text-left">
             <h1 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2 drop-shadow-md">
               NEON / SNAKE
             </h1>
             <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Cybernetic Routing Protocol</p>
           </div>
           
           <SnakeGame />
        </div>

        {/* Right Column: Music Player & Info */}
        <div className="w-full xl:w-80 flex flex-col shrink-0 gap-8">
           <MusicPlayer />
           
           {/* Extra decorative pane */}
           <div className="hidden xl:block bg-black/20 border border-slate-800 rounded-2xl p-6 h-full backdrop-blur-sm">
             <h3 className="text-purple-400 font-mono text-xs uppercase tracking-widest mb-4 border-b border-purple-900/50 pb-2">Terminal Logs</h3>
             <div className="space-y-2 font-mono text-[10px] text-slate-600">
               <p>&gt; INF: Audio subsystem online</p>
               <p>&gt; INF: Grid rendering initialized</p>
               <p>&gt; WRN: High neural activity detected</p>
               <p className="animate-pulse text-cyan-600">&gt; Awaiting user input _</p>
             </div>
           </div>
        </div>

      </main>
    </div>
  );
}
