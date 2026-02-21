import React from 'react'

interface RecordingScreenProps {
  duration: number
  onStop: () => void
  onDiscard: () => void
  isPaused: boolean
  onTogglePause: () => void
}

const RecordingScreen: React.FC<RecordingScreenProps> = ({ duration, onStop, onDiscard, isPaused, onTogglePause }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white">
            <span className="material-symbols-outlined">mic</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">VoiceAI</h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">history</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
            <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt6TfyFnbS6rQkQu2SE6rlb_8kVQaEleB8Vk-b7qubrQPUH14bKE0Bz7GyMcrGhCFtGQ4bMKIsw1oBwbaSOcUQtsWnsImQMQhzkQG3Ao5d9-txdb38tGQarp3infIxhNZjBmpKemHQhqm6HWYD1M_eA_S95TUE8bhJutFQwLSwk_EFNyN_uMKqyGB6tqQZruoS1vk64LDUiKpDIFb1NXSk_Qlpc1ToQysBfjvSI58uxhnMi_I2Sg_na_izJw0GLBs0vl-GMfgXvpw"/>
          </div>
        </div>
      </header>

      {/* Main Recording Interface */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-6">
        {/* Status & Timer */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className={`flex items-center gap-2 px-4 py-1.5 ${isPaused ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100'} rounded-full border dark:border-red-800/50`}>
            <span className={`w-2.5 h-2.5 ${isPaused ? 'bg-amber-600' : 'bg-red-600'} rounded-full ${!isPaused && 'animate-pulse'}`}></span>
            <span className="text-xs font-bold uppercase tracking-widest">{isPaused ? 'Paused' : 'Recording'}</span>
          </div>
          <div className="text-8xl font-extrabold tracking-tighter tabular-nums text-slate-900 dark:text-white">
            {formatTime(duration)}<span className="text-primary text-4xl ml-1 font-bold">.0</span>
          </div>
          <p className="text-slate-400 font-medium">Internal Microphone • 44.1kHz WAV</p>
        </div>

        {/* Waveform Visualizer Area (Simulated) */}
        <div className="w-full h-64 relative flex items-center justify-center overflow-hidden mb-12">
           <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
            {[12, 24, 16, 32, 40, 20, 48, 36, 56, 44, 60, 32, 48, 20, 40, 24, 12].map((h, i) => (
              <div key={i} className="w-1 bg-primary/40 rounded-full" style={{ height: `${h * 2}px` }}></div>
            ))}
          </div>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-[80%] h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 1000 200">
              <path
                d="M0 100 Q 125 20, 250 100 T 500 100 T 750 100 T 1000 100"
                fill="none"
                opacity="0.9"
                stroke="#2b8cee"
                strokeLinecap="round"
                strokeWidth="4"
                className={!isPaused ? 'animate-pulse' : ''}
              />
              <path
                d="M0 100 Q 125 180, 250 100 T 500 100 T 750 100 T 1000 100"
                fill="none"
                opacity="0.6"
                stroke="#2b8cee"
                strokeLinecap="round"
                strokeWidth="3"
                className={!isPaused ? 'animate-pulse' : ''}
              />
            </svg>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-12">
          {/* Pause Button */}
          <button onClick={onTogglePause} className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-all duration-300">
              <span className="material-symbols-outlined text-3xl">{isPaused ? 'play_arrow' : 'pause'}</span>
            </div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Stop Button */}
          <button onClick={onStop} className="flex flex-col items-center gap-3 group relative">
            <div className="absolute inset-0 w-24 h-24 -m-2 bg-primary/20 rounded-full blur-xl scale-110 opacity-50"></div>
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 transform transition-transform duration-300 group-hover:scale-105 active:scale-95 z-10">
              <div className="w-8 h-8 bg-white rounded-md"></div>
            </div>
            <span className="text-sm font-bold text-primary uppercase tracking-widest z-10">Stop</span>
          </button>

          {/* Discard Button */}
          <button onClick={onDiscard} className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 group-hover:text-red-500 transition-all duration-300">
              <span className="material-symbols-outlined text-3xl">close</span>
            </div>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Discard</span>
          </button>
        </div>
      </main>

      {/* Bottom Metadata */}
      <footer className="p-8 max-w-7xl mx-auto w-full flex justify-between items-center text-slate-400 text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">description</span>
          <span>Real-time transcription active</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">hard_drive</span>
            <span>{(duration * 0.1).toFixed(1)} MB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">volume_up</span>
            <span>Gain: +2.0dB</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RecordingScreen
