import { PartProps } from "../types"
import yellow from "../../../componenets/yellow.jpeg"

const Part3:React.FC<PartProps> = ({content, questions}) => {
    return (
        <div className="mt-5 flex flex-col gap-2" >

            <p className="text-xl font-bold">Background Information</p>
            <div className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>
                <p>{content.content}</p>
            </div>

            {questions?.map(question => (
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">Question {question.question_order}</p>
                    <p className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>{question.question_text}</p>
                </div>

            ))}
        </div>
    )
}

export default Part3