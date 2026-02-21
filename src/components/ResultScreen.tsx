import React from 'react'

interface TranscriptItem {
  text: string
  timeRange: string
  isHighlight?: boolean
}

interface ResultScreenProps {
  transcript: TranscriptItem[]
  duration: number
  onBack: () => void
}

const ResultScreen: React.FC<ResultScreenProps> = ({ transcript, duration, onBack }) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  // Fallback mock transcript if none provided
  const displayTranscript = transcript.length > 0 ? transcript : [
    {
      timeRange: "00:00 - 00:05",
      text: "안녕하세요. 오늘 회의에서는 인공지능 기술의 통합 방안에 대해 논의하겠습니다."
    }
  ]

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-background-dark/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-2xl">graphic_eq</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">VoiceRecorder AI</h1>
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Premium Transcription</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Library</a>
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Integrations</a>
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Settings</a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-bold text-sm shadow-md hover:shadow-xl hover:bg-primary/90 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Recording
            </button>
            <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-700 overflow-hidden">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYMV3ojDndZ0TAInvLEbuX280oBDRiPjO0mVFwKt6KwcX56yY8FZT804gaOJggmHKtIPOhEnGLB--EfRlMLuTs-my40xcrDlHKAaUWri-boczkmRAWQszg8juLUM44e2ji4J3GiKQhD6galczQaRFNybLV6ol6DJ-_LPWJcU6C1f_geEWwaoOgiNFRVnJEVk_CxNsO6jM7DULrLEf-3fEKWrvv9VuY6Bgrde_wCv2S0pgbSmwvqVJggulPn33moFD343D-GN0upwc"/>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb & Header Info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
                <span>Library</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-primary">Transcription Result</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Strategy_Meeting_Final.wav</h2>
              <p className="text-slate-500 mt-1">Recorded on {new Date().toLocaleDateString()} • {formatDuration(duration)}</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                AI Transcribed
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">auto_awesome</span>
                High Accuracy
              </span>
            </div>
          </div>

          {/* Main Result Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              {/* Card Top Audio Visualization */}
              <div className="h-24 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 flex items-center px-8 gap-1">
                <div className="flex-1 flex items-center justify-center gap-[2px]">
                  {[4, 8, 12, 6, 10, 14, 4, 8, 10, 6, 12, 16, 10, 4, 8, 12, 6, 10, 14, 8, 12, 6, 10, 16, 4].map((h, i) => (
                    <div key={i} className={`w-1 rounded-full ${i > 2 && i < 7 ? 'bg-primary' : i > 14 && i < 20 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} style={{ height: `${h * 4}px` }}></div>
                  ))}
                </div>
                <button className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  <span className="material-symbols-outlined fill-1">play_arrow</span>
                </button>
              </div>

              {/* Transcription Text Content */}
              <div className="p-8 md:p-12 custom-scrollbar max-h-[600px] overflow-y-auto">
                <div className="space-y-8">
                  {displayTranscript.map((item, index) => (
                    <div key={index} className={item.isHighlight ? "bg-primary/5 dark:bg-primary/10 p-6 rounded-lg border-l-4 border-primary" : ""}>
                      <span className={`text-xs font-bold uppercase tracking-widest block mb-3 ${item.isHighlight ? 'text-primary' : 'text-slate-400 dark:text-slate-600'}`}>
                        {item.isHighlight ? 'Key Highlight' : item.timeRange}
                      </span>
                      <p className="text-xl md:text-2xl leading-[1.6] font-medium text-slate-800 dark:text-slate-200">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="border-t border-slate-100 dark:border-slate-800 p-6 bg-slate-50/50 dark:bg-slate-950/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95">
                    <span className="material-symbols-outlined text-xl text-slate-500">content_copy</span>
                    <span>Copy Text</span>
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95">
                    <span className="material-symbols-outlined text-xl text-slate-500">share</span>
                    <span>Share</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 hover:text-primary transition-colors active:scale-95 shadow-sm">
                    <span className="material-symbols-outlined">star</span>
                  </button>
                  <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 hover:text-red-500 transition-colors active:scale-95 shadow-sm">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                  <button onClick={onBack} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-xl">download</span>
                    <span>Save to Library</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Floating Record Trigger */}
          <div className="mt-12 flex justify-center">
            <button onClick={onBack} className="group flex flex-col items-center gap-4">
              <div className="size-20 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform ring-8 ring-primary/10">
                <span className="material-symbols-outlined text-4xl text-white">mic</span>
              </div>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">Start New Recording</span>
            </button>
          </div>
        </div>
      </main>

      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>
    </div>
  )
}

export default ResultScreen
