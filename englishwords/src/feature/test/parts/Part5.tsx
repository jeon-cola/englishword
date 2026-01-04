import { PartProps } from "../types"
import yellow from "../../../componenets/yellow.jpeg"
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition"
import { useSpeechSynthesis } from "../../../hooks/useSpeechSynthesis"
import { useTimer } from "../../../hooks/useTimer"
import { useEffect } from "react"

const Part5:React.FC<PartProps> = ({ content, questions, onComplete }) => { 
    const {answer, recording, recordingHandler} = useSpeechRecognition({lang: "en-US"})
    const {speak} = useSpeechSynthesis()
    const time = useTimer({recording})

    useEffect(() => {
        if (answer) onComplete(content.content_order, answer)
    },[answer])

    return (
        <div className="mt-5 flex flex-col gap-2 border-t-2 border-gray-300 p-2">
            <p className="font-bold text-xl">Question</p>
            <p className="p-5 rounded-xl cursor-pointer" 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={() => {
                    speak(content.content)
                }}
            >{content.content}</p>

            <div className="border-t-2 border-gray-300 flex flex-col gap-2 py-2">
                {questions?.map(question => (
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-bold">Otions {question.question_order}</p>
                        <p className="p-5 rounded-xl cursor-pointer" 
                            style={{backgroundImage: `url(${yellow})`}}
                            onClick={() => {speak(question.question_text)}}
                        >{question.question_text}</p>
                    </div>
                ))}
            </div>


            <p className="font-bold border-t-2 border-gray-300 pt-2">Answer</p>
            <div className={`p-5 rounded-xl cursor-pointer ${recording ? "opacity-70" : ""}`} 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={recordingHandler}
            >
                <p>{recording ? "Recording..." : answer || "Click to speak"}</p>
            </div>

            <div className={`self-center text-2xl font-bold transition duration-300 ${time < 50 ? "text-black" : time < 60 ? "text-yellow-500" : recording ? "text-red-500 animate-pulse": "text-red-500 "}`}>
                {time > 0 && `Time : ${time}s`}
             </div>
        </div>
    )
}

export default Part5