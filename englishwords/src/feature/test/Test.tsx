import { useEffect, useState } from "react"
import bg from "../../componenets/background.png"
import white from "../../componenets/white.webp"
import axios from "../../libs/axios"
import { TestProps } from "../../routes/TestRouter"
import TestNode from "./TestNode"

export interface PartProgress {
  part_id: number,
  part_no: number,
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED",
  completed_at: string | null
}

export interface TestProgress {
  test_id: number,
  parts: PartProgress[]
}

// 테스트 컴포넌트
const Test:React.FC<TestProps> = ({isLogin}) => {
  const [testList, setTestList] = useState<TestProgress[]>([])

  useEffect(() => {
    const data = async () => {
      await axios.get("http://localhost:8080/api/create_test/reach_test",{params: {userId: isLogin.id}})
      .then((res) => {
        console.log(res.data)
        setTestList(
          res.data.data
        )
      })
    }
    data()
  },[isLogin?.id])
  return (
    <div 
      className="absolute inset-0 bg-cover bg-top bg-no-repeat flex justify-center"
      style={{backgroundImage: `url(${bg})`}}
    >
      <div className="mt-16 h-[835px] w-2/3 bg-cover rounded-xl shadow-xl"
        style={{backgroundImage: `url(${white})`}}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 text-left font-bold text-3xl ">TOEIC Speaking Test</div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-2">
              {testList.map(test => (
                <TestNode testNumber={`문제${test.test_id}`}  partCheck={test.parts}/>
              ))}
            </div>
          </div>

        </div>

      </div>


    </div>
  )
}
export default Test