import { PartProps } from "../types"
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition"
import yellow from "../../../componenets/yellow.jpeg"
import { useTimer } from "../../../hooks/useTimer"
import { useEffect } from "react"

const Part2:React.FC<PartProps> = ({content, onComplete}) => {
    const {answer, recording, recordingHandler } = useSpeechRecognition({lang: "en-US"})
    const time = useTimer({recording})

    useEffect(() => {
        if (answer) onComplete(content.content_order, answer)
    },[answer])

    return(
        <div className="flex flex-col  gap-2 text-left mt-5 border-t-2 border-gray-300 p-2">
            <p className="font-bold">Question{content.content_order}</p>
            <img src={content.content} alt="content image" className="w-[550px] rounded-xl self-center" />

            <p className="font-bold">Answer {content.content_order}</p>
            <div className={`p-5 rounded-xl cursor-pointer ${recording ? "opacity-70" : ""}`} 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={recordingHandler}
            >
                <p>{recording ? "Recording..." : answer || "Click to speak"}</p>
            </div>

                    <div className={`self-center text-2xl font-bold transition duration-300 ${time < 20 ? "text-black" : time < 30 ? "text-yellow-500" : recording ? "text-red-500 animate-pulse": "text-red-500 "}`}>
                {time > 0 && `Time : ${time}s`}
        </div>
        </div>
    )
}

export default Part2