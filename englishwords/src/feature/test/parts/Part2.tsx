import { PartProps } from "../types"
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition"
import yellow from "../../../componenets/yellow.jpeg"

const Part2:React.FC<PartProps> = ({content}) => {
    const {answer, recording, recordingHandler } = useSpeechRecognition({lang: "en-US"})
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
        </div>
    )
}

export default Part2