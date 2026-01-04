import React, { useEffect, useState } from "react"
import yellow from "../../../componenets/yellow.jpeg"
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition"
import { useSpeechSynthesis } from "../../../hooks/useSpeechSynthesis"
import { useTimer } from "../../../hooks/useTimer"
import { PartQuestionProps } from "../types"


const PartQuestion:React.FC<PartQuestionProps> = ({question, content ,onComplete }) => {
    const {answer, recording, recordingHandler} = useSpeechRecognition({lang: "en-US"})
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const {speak} = useSpeechSynthesis()
    const time = useTimer({recording})
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

    const startRecording = (order: number) => {
        setActiveQuestion(order)
        recordingHandler()
    }

    const isActive = activeQuestion === question.question_order

    useEffect(() => {
        if (answer && activeQuestion){ 
            setAnswers(prev => ({...prev, [activeQuestion]: answer}))
            onComplete(question.question_order, answer)
        }
    },[answer])

    return(
        <div className="flex flex-col gap-2 border-t-2 border-gray-300 p-2">
            <p className="text-xl font-bold">Question {question.question_order}</p>
            <p className="p-5 rounded-xl cursor-pointer" 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={() => {speak(question.question_text)}}
            >{question.question_text}</p>

            <p className="font-bold">Answer {question.question_order}</p>
            <div className={`p-5 rounded-xl cursor-pointer ${recording ? "opacity-70" : ""}`} 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={() => startRecording(question.question_order)}
            >
                <p>{answers[question.question_order] ? answers[question.question_order] : isActive && recording ? "Recording..." : "Click to speak"}</p>
            </div>

            { isActive && <div className={`self-center text-2xl font-bold transition duration-300 
                ${ question.question_order !== 3 
                    ? time < 10 ? "text-black" : time < 15 ? "text-yellow-500" : recording ? "text-red-500 animate-pulse": "text-red-500 "
                    : time < 20 ? "text-black" : time < 30 ? "text-yellow-500" : recording ? "text-red-500 animate-pulse": "text-red-500 "
                }`}>
                {time > 0 && `Time : ${time}s`}
            </div>}
        </div>
    )
}

export default PartQuestion