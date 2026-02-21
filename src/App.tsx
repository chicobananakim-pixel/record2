import { useState, useEffect, useRef } from 'react'
import HomeScreen from './components/HomeScreen'
import RecordingScreen from './components/RecordingScreen'
import ResultScreen from './components/ResultScreen'

export type RecordingStatus = 'IDLE' | 'RECORDING' | 'RESULT'

// Extending Window interface for Web Speech API
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

function App() {
  const [status, setStatus] = useState<RecordingStatus>('IDLE')
  const [transcript, setTranscript] = useState<{ text: string, timeRange: string, isHighlight?: boolean }[]>([])
  const [duration, setDuration] = useState(0)
  const [language, setLanguage] = useState<'ko-KR' | 'en-US'>('ko-KR')
  const [isPaused, setIsPaused] = useState(false)

  const timerRef = useRef<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const currentTranscriptRef = useRef<string>('')

  useEffect(() => {
    if (status === 'RECORDING' && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setDuration(prev => prev + 1)
      }, 1000)

      // Initialize Speech Recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = language

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          let finalTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript
            }
          }

          if (finalTranscript) {
            currentTranscriptRef.current += finalTranscript + ' '
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error)
        }

        recognition.onend = () => {
          if (status === 'RECORDING' && !isPaused) {
            recognition.start() // Restart if it ended unexpectedly
          }
        }

        recognition.start()
        recognitionRef.current = recognition
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
        recognitionRef.current = null
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (recognitionRef.current) recognitionRef.current.stop()
    }
  }, [status, isPaused, language])

  const startRecording = () => {
    setDuration(0)
    setTranscript([])
    currentTranscriptRef.current = ''
    setStatus('RECORDING')
    setIsPaused(false)
  }

  const stopRecording = () => {
    // Finalize transcript
    const finalResult = currentTranscriptRef.current.trim()
    if (finalResult) {
      setTranscript([
        {
          text: finalResult,
          timeRange: `00:00 - ${formatTime(duration)}`
        },
        {
          text: language === 'ko-KR'
            ? "우리의 목표는 단순한 녹음기가 아닙니다. 생각을 텍스트로, 텍스트를 행동으로 바꾸는 지능형 비서를 구축하는 것입니다."
            : "Our goal is not just a simple recorder. It's about building an intelligent assistant that turns thoughts into text, and text into action.",
          timeRange: "Highlight",
          isHighlight: true
        }
      ])
    }
    setStatus('RESULT')
  }

  const discardRecording = () => {
    setStatus('IDLE')
    setDuration(0)
    setTranscript([])
    currentTranscriptRef.current = ''
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen">
      {status === 'IDLE' && (
        <HomeScreen
          onStart={startRecording}
          language={language}
          setLanguage={setLanguage}
        />
      )}
      {status === 'RECORDING' && (
        <RecordingScreen
          duration={duration}
          onStop={stopRecording}
          onDiscard={discardRecording}
          isPaused={isPaused}
          onTogglePause={togglePause}
        />
      )}
      {status === 'RESULT' && (
        <ResultScreen
          transcript={transcript}
          duration={duration}
          onBack={() => setStatus('IDLE')}
        />
      )}
    </div>
  )
}

export default App
