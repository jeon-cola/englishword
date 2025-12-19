import { PartProps } from "./Part1"

const Part5:React.FC<PartProps> = ({content}) => {
    return (
        <div className="mt-5">{content.content}</div>
    )
}

export default Part5