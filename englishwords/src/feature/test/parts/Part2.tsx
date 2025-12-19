import { PartProps } from "./Part1"

const Part2:React.FC<PartProps> = ({content}) => {
    return(
        <div className="flex flex-col items-center gap-2">
            <p className="font-bold">Question{content.content_order}</p>
            <img src={content.content} alt="content image" className="w-[550px]" />
        </div>
    )
}

export default Part2