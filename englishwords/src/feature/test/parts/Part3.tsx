import { PartProps } from "../types"
import yellow from "../../../componenets/yellow.jpeg"
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition"

const Part3:React.FC<PartProps> = ({content, questions}) => {
    const {answer, recording, recordingHandler} = useSpeechRecognition({lang: "en-US"})
    return (
        <div className="mt-5 flex flex-col gap-2" >

            <p className="text-xl font-bold">Background Information</p>
            <div className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>
                <p>{content.content}</p>
            </div>
            
            {questions?.map(question => (
                <div className="flex flex-col gap-2 border-t-2 border-gray-300 p-2">
                    <p className="text-xl font-bold">Question {question.question_order}</p>
                    <p className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>{question.question_text}</p>

                    <p className="font-bold">Answer {question.question_order}</p>
                    <div className={`p-5 rounded-xl cursor-pointer ${recording ? "opacity-70" : ""}`} 
                        style={{backgroundImage: `url(${yellow})`}}
                        onClick={recordingHandler}
                    >
                        <p>{recording ? "Recording..." : answer || "Click to speak"}</p>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default Part3