import { PartProps } from "../types"
import yellow from "../../../componenets/yellow.jpeg"

const Part5:React.FC<PartProps> = ({ content, questions}) => { 
    return (
        <div className="mt-5 flex flex-col gap-2">
            <p className="font-bold text-xl">Question</p>
            <p className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>{content.content}</p>
            {questions?.map(question => (
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">Otions {question.question_order}</p>
                    <p className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>{question.question_text}</p>
                </div>
            ))}
        </div>
    )
}

export default Part5