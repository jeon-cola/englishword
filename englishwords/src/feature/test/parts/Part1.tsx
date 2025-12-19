import { Content } from "../TestDetail"
import yellow from "../../../componenets/yellow.jpeg"

export interface PartProps {
    content: Content
}
const Part1:React.FC<PartProps> = ({content}) => {
    return(
        <div className="flex flex-col gap-2 mt-5">
            <p className="font-bold">Question {content.content_order}</p>
            <div className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>
                <p>{content.content}</p>
            </div>
        </div>
        )
}

export default Part1