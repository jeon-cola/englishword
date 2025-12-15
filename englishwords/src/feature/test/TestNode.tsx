import trueCheck from "../../componenets/trueCheck.png"
import falseCheck from "../../componenets/falseCheck.png"
import closeIcon from "../../componenets/closeIcon.png"
import openIcon from "../../componenets/openICon.png"
import playIcon from "../../componenets/playIcon.png"
import nullIcon from "../../componenets/nullIcon.png"
import { useState } from "react"
import { p } from "react-router/dist/development/index-react-server-client-BKpa2trA"
type partKey = "part1" | "part2" | "part3" | "part4" | "part5"

interface testNodeProps {
    testNumber: string,
    partCheck: Record<partKey, boolean | null>
}

const TestNode:React.FC<testNodeProps> = ({testNumber, partCheck}) => {
    const [isOpen, setIsOpen] = useState(false)
    const progress = Object.values(partCheck).filter(Boolean).length*20
    return(
        <div className=" mx-2 py-3 px-20 border-4 border-[#BEB8B8] rounded-xl shadow-xl">

            <div className="flex items-center justify-between">
                <p className="font-bold text-3xl">{testNumber}</p>

                <div className="flex gap-2 items-center">
                    {(Object.entries(partCheck) as [partKey, boolean][]).map(
                        ([key, value]) => (
                            <img src={
                                (value ? trueCheck : (value !== null ? falseCheck : nullIcon ))
                            } alt={`${key} check img`}
                            className="w-[40px]"
                            />
                        )
                    )}
                <p className="ml-2 font-bold text-2xl text-[#064B9D]">{`달성도 ${progress}%`}</p>
                </div>

            
                <div className="flex gap-2">
                    <div className="w-[45px] flex" onClick={() => {setIsOpen(!isOpen)}}>
                        {!isOpen ? <img src={closeIcon} alt="closeIcon"/> : <img src={openIcon} alt="openIcon"/>}
                    </div>
                    
                    <div className="w-[45px]">
                        <img src={playIcon} alt="playicon" />
                    </div>
                </div>
            </div>

            {isOpen && <div className="flex flex-col gap-2 mt-3">
                {(Object.entries(partCheck) as [partKey, boolean][]).map(
                    ([key,value]) => (
                        <div className="flex items-center justify-between border-b-4 border-b-[#BEB8B8] pb-2 border-opacity-50">
                            <p className="font-bold text-2xl">{key}</p>
                            <img src={(value ? trueCheck : (value !== null ? falseCheck : nullIcon ))} alt="checkIcon" 
                                className="w-[40px]"
                            />
                        </div>
                    )
                )}
            </div>}
        </div>
    )
}

export default TestNode