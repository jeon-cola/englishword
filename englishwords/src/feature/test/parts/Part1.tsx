import { PartProps } from "../types"
import yellow from "../../../componenets/yellow.jpeg"
import { useEffect, useRef, useState } from "react"



const Part1:React.FC<PartProps> = ({content}) => {
    const [answer, setAnswer] = useState("")
    const [recording, setRecording] = useState(false)

    const recognitionRef = useRef<any>(null) 

    useEffect(() => {
        const SpeechRecognition = 
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition
        
        if (!SpeechRecognition) {
            alert("해당 브라우저에서 지원하지 하는 기능입니다.")
            return
        }

        const recognition = new SpeechRecognition()
        recognition.lang = "en-US"
        recognition.continuous = false
        recognition.interimResults = true

        recognition.onresult = (e:any) => {
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

        recognition.onerror = (e: any) => {
            console.log(e)
            setRecording(false)
        }

        recognitionRef.current = recognition

        return () => {
            recognition.stop()
        }
    },[])

    const startSTT = () => {
        if (recording) return
        setAnswer("")
        recognitionRef.current?.start()
        setRecording(true)
    }

    return(
        <div className="flex flex-col gap-2 mt-5">
            <p className="font-bold">Question {content.content_order}</p>
            <div className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>
                <p>{content.content}</p>
            </div>

            <p className="font-bold">Answer {content.content_order}</p>
            <div className={`p-5 rounded-xl cursor-pointer ${recording ? "opacity-70" : ""}`} 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={startSTT}
            >
                <p>{recording ? "Recording..." : answer || "Click to speak"}</p>
            </div>
        </div>
        )
}

export default Part1