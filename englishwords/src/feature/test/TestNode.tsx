import trueCheck from "../../componenets/trueCheck.png"
import falseCheck from "../../componenets/falseCheck.png"
import closeIcon from "../../componenets/closeIcon.png"
import openIcon from "../../componenets/openICon.png"
import playIcon from "../../componenets/playIcon.png"
import nullIcon from "../../componenets/nullIcon.png"
import { useState } from "react"
import { PartProgress } from "./Test"
import { useNavigate } from "react-router"

interface testNodeProps {
    testNumber: string,
    partCheck: PartProgress[]
}

const getStatusIcon = (status: PartProgress["status"]) => {
  switch (status) {
    case "COMPLETED":
      return trueCheck
    case "IN_PROGRESS":
      return falseCheck
    default:
      return nullIcon
  }
}

const TestNode:React.FC<testNodeProps> = ({testNumber, partCheck}) => {
    const [isOpen, setIsOpen] = useState(false)
    const nav = useNavigate()

    console.log(partCheck)

    const completedCount = partCheck.filter(
        p => p.status === "COMPLETED"
    ).length

    const progress = Math.round(
        (completedCount / partCheck.length) * 100
    )
    return(
        <div className=" mx-2 py-3 px-20 border-4 border-[#BEB8B8] rounded-xl shadow-xl">

            <div className="flex items-center justify-between">
                <p className="font-bold text-3xl">{`문제${testNumber}`}</p>

                <div className="flex gap-2 items-center">
                    {partCheck.map(part => (
                        <img
                        key={part.part_id}
                        src={getStatusIcon(part.status)}
                        alt={`part${part.part_no} status`}
                        className="w-[40px]"
                        />
                    ))}
                <p className="ml-2 font-bold text-2xl text-[#064B9D]">{`달성도 ${progress}%`}</p>
                </div>

            
                <div className="flex gap-2">
                    <div className="w-[45px] flex" onClick={() => {setIsOpen(!isOpen)}}>
                        {!isOpen ? <img src={closeIcon} alt="closeIcon" className="cursor-pointer"/> : <img src={openIcon} alt="openIcon" className="cursor-pointer"/>}
                    </div>
                    
                    <div className="w-[45px]" onClick={() => nav(`/test/detail?test=${testNumber}&part=1`)}>
                        <img src={playIcon} alt="playicon" className="cursor-pointer"/>
                    </div>
                </div>
            </div>

            
            {isOpen && (
                <div className="flex flex-col gap-2 mt-3">
                {partCheck.map(part => (
                    <div
                    key={part.part_id}
                    className="flex items-center justify-between border-b-4 border-b-[#BEB8B8] pb-2 border-opacity-50"
                    >
                    <p className="font-bold text-2xl">
                        Part {part.part_no}
                    </p>
                    <img
                        src={getStatusIcon(part.status)}
                        alt="checkIcon"
                        className="w-[40px]"
                    />
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}

export default TestNode