import React from 'react'

interface HomeScreenProps {
  onStart: () => void
  language: 'ko-KR' | 'en-US'
  setLanguage: (lang: 'ko-KR' | 'en-US') => void
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, language, setLanguage }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen selection:bg-primary/20">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-9 bg-primary flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-2xl">graphic_eq</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">Echo</h1>
          </div>
          <div className="flex items-center gap-8">
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-2" href="#">
              <span className="material-symbols-outlined text-lg">folder_open</span>
              My Recordings
            </a>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
            <button className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 pr-4 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all">
              <div className="size-8 rounded-full overflow-hidden bg-primary/10">
                <img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt0DCPmO5zgv_mtDSdMOJkPAvk30OwF1QhmzSbh495oceJpUQWu9hjNYQLDre-rTUnTPOyxkooofSCU7G_CznCjnXJGKU4ce_KV5ipume5nHrSTX9GoxF7iePj-sCPAKQRTSeGvmU-k-d2UxzTk8we2TvAplVwV6rI-_ilVdGWgJlwx4x7LsWCigOjk_ZSD3mN0dB8V5WY-sKJu2za-t_LNetEK5VSXIP_NY0eOXIveeeFexR8LJj-yGv1mH5Qlz35F_3C-k8Lky4"/>
              </div>
              <span className="text-sm font-medium">Alex Chen</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-[1000px] w-full bg-white dark:bg-slate-900/50 rounded-xl apple-shadow p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute -top-24 -right-24 size-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 size-64 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 space-y-12 w-full flex flex-col items-center">
            {/* Header Section */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Capture Every Word. <br/>
                <span className="text-primary">AI Transcription Redefined.</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                High-fidelity voice recording meets instant, accurate transcription in 50+ languages.
              </p>
            </div>

            {/* Control Section */}
            <div className="flex flex-col items-center gap-10 w-full max-w-sm">
              {/* Language Toggle */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full flex items-center relative shadow-inner">
                <div className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-white dark:bg-slate-700 rounded-full shadow-sm transition-all duration-300 transform ${language === 'ko-KR' ? 'translate-x-0' : 'translate-x-full'}`}></div>
                <button
                  onClick={() => setLanguage('ko-KR')}
                  className={`relative flex-1 py-2 text-sm font-semibold transition-colors ${language === 'ko-KR' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  Korean
                </button>
                <button
                  onClick={() => setLanguage('en-US')}
                  className={`relative flex-1 py-2 text-sm font-semibold transition-colors ${language === 'en-US' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                >
                  English
                </button>
              </div>

              {/* Primary Record Button Area */}
              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={onStart}
                  className="group relative size-32 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all active:scale-95 record-pulse"
                >
                  <span className="material-symbols-outlined text-white text-5xl font-light">mic</span>
                  <div className="absolute -inset-4 border-2 border-red-500/10 rounded-full"></div>
                </button>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-200">
                    Ready to record
                  </p>
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    Click the button to start your session
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-8">
              {['Studio Quality', 'Real-time AI', 'End-to-End Encryption'].map((feature) => (
                <div key={feature} className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-full border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-6">
            <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <span className="size-1 bg-slate-300 rounded-full"></span>
            <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
            <span className="size-1 bg-slate-300 rounded-full"></span>
            <a className="text-sm font-medium text-slate-400 hover:text-primary transition-colors" href="#">Help Center</a>
          </div>
          <p className="text-xs text-slate-400">© 2024 Echo Labs. All rights reserved.</p>
        </footer>
      </main>

      {/* Floating Toast */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <div className="bg-slate-900 text-white px-5 py-3 rounded-full apple-shadow flex items-center gap-3 border border-white/10">
          <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Mic permissions granted</span>
          <button className="material-symbols-outlined text-sm opacity-50 hover:opacity-100">close</button>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
