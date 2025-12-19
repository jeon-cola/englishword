import { PartProps } from "./Part1"
import yellow from "../../../componenets/yellow.jpeg"

const Part3:React.FC<PartProps> = ({content}) => {
    return (
        <div className="mt-5 " >
            <div className="p-5 rounded-xl" style={{backgroundImage: `url(${yellow})`}}>
                <p>{content.content}</p>
            </div>
        </div>
    )
}

export default Part3