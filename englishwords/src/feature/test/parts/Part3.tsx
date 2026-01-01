import { PartProps } from "../types"
import yellow from "../../../componenets/yellow.jpeg"
import { useSpeechSynthesis } from "../../../hooks/useSpeechSynthesis"
import PartQuestion from "./PartQuestion"

const Part3:React.FC<PartProps> = ({content, questions, onComplete}) => {
    const {speak} = useSpeechSynthesis()

    return (
        <div className="mt-5 flex flex-col gap-2" >

            <p className="text-xl font-bold">Background Information</p>
            <div className="p-5 rounded-xl cursor-pointer" 
                style={{backgroundImage: `url(${yellow})`}}
                onClick={() => {speak(content.content)}}
            >
                <p>{content.content}</p>
            </div>
            
            {questions?.map(question => (
                <PartQuestion question={question} content={content} onComplete={onComplete}/>
            ))}

        </div>
    )
}

export default Part3