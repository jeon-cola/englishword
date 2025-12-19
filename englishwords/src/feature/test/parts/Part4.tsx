import { PartProps } from "./Part1"

const Part4:React.FC<PartProps> = ({content}) => {
    return (
        <div className="mt-5 flex flex-col">
            <img src={content.content} alt="content image" className="self-center"/>
        </div>
    )
}

export default Part4