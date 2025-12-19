import { Content } from "../TestDetail"

export interface PartProps {
    content: Content
}
const Part1:React.FC<PartProps> = ({content}) => {
    return(
        <div>
            <p className="font-bold">Question {content.content_order}</p>
            <p>{content.content}</p>
        </div>
        )
}

export default Part1