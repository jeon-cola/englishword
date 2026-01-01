import { PartProps } from "../types"
import yellow from "../../../componenets/yellow.jpeg"
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition"
import { useSpeechSynthesis } from "../../../hooks/useSpeechSynthesis"
import {useTimer} from "../../../hooks/useTimer"
import { useEffect } from "react"



const Part1:React.FC<PartProps> = ({content, onComplete}) => {
    const { answer, recording, recordingHandler } = useSpeechRecognition({lang: "en-US"})
    const {speak} = useSpeechSynthesis()
    const time = useTimer({recording})

    useEffect(() => {
        if (answer) onComplete(content.content_order, answer)
    },[answer])

    return(
        <div className="flex flex-col gap-2 mt-5 border-t-2 border-gray-300 p-2">
            <p className="font-bold">Question {content.content_order}</p>
            <div className="p-5 rounded-xl cursor-pointer" 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={()=> {speak(content.content)}}
            >
                <p>{content.content}</p>
            </div>

            <p className="font-bold">Answer {content.content_order}</p>
            <div className={`p-5 rounded-xl cursor-pointer ${recording ? "opacity-70" : ""}`} 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={recordingHandler}
            >
                <p>{recording ? "Recording..." : answer || "Click to speak"}</p>
            </div>
            
        <div className={`self-center text-2xl font-bold transition duration-300 ${time < 30 ? "text-black" : time < 45 ? "text-yellow-500" : recording ? "text-red-500 animate-pulse": "text-red-500 "}`}>
                {time > 0 && `Time : ${time}s`}
        </div>
        
        </div>
        )
}

export default Part1