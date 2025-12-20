import { PartProps } from "../types"

const Part2:React.FC<PartProps> = ({content}) => {
    return(
        <div className="flex flex-col  gap-2 text-left mt-5">
            <p className="font-bold">Question{content.content_order}</p>
            <img src={content.content} alt="content image" className="w-[550px] rounded-xl self-center" />
        </div>
    )
}

export default Part2