import { PartProps } from "../types" 
import PartQuestion from "./PartQuestion"

const Part4:React.FC<PartProps> = ({content, questions, onComplete}) => {
    return (
        <div className="mt-5 flex flex-col gap-2 ">
            <img src={content.content} alt="content image" className="self-center"/>

            {questions?.map(question => (
                <PartQuestion  content={content} question={question} onComplete={onComplete} />
            ))}
        </div>
    )
}

export default Part4