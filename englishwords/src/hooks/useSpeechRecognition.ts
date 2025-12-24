import { useEffect, useRef, useState } from "react"

interface UseSpeechRecognitionOptions {
    lang?: string
}

export const useSpeechRecognition = (
    {lang = "en-US"}: UseSpeechRecognitionOptions = {}
) => {
    const recognitionRef = useRef<any>(null)
    const [recording, setRecording] = useState(false)
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        const SpeechRecognition = 
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition

        if (!SpeechRecognition) {
            alert("해당 브라우저에서 지원하지 않는 기능입니다.")
            return
        }

        const recognition = new SpeechRecognition()
        recognition.lang = lang
        recognition.continuous = true
        recognition.interimResults = true

        recognition.onresult = (e: any) => {
            console.log(e)
            let finalText = ""
            for (let i = e.resultIndex; i < e.results.length; i++) {
                if (e.results[i].isFinal) {
                    finalText += e.results[i][0].transcript
                }
            }

            if (finalText) {
                setAnswer(prev => (prev + " " + finalText).trim())
            }
        }

        recognition.onend = () => {
            setRecording(false)
        }

        recognition.onerror = (e:any) => {
            console.log(e)
            setRecording(false)
        }

        recognitionRef.current = recognition

        return () => {
            recognition.stop()
        }
    },[lang])

    const startRecording = () => {
        if (!recognitionRef.current) return
        setRecording(true)
        recognitionRef.current.start()
    }

    const stopRecording = () => {
        if (!recognitionRef.current) return
        recognitionRef.current.stop()
        setRecording(false)
    }

    const resetAnswer = () => {
        setAnswer("")
    }

    const recordingHandler = () => {
        if (recording) {
            stopRecording()
        } else {
            resetAnswer()
            startRecording()
        }
    }

    return {
        answer, recording, recordingHandler
    }
}