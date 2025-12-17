import { useEffect } from "react"
import bg from "../../componenets/background.png"
import white from "../../componenets/white.webp"
import TestNode from "./TestNode"
import axios from "../../libs/axios"
// 테스트 컴포넌트
const Test:React.FC = () => {
  useEffect(() => {
    const data = async () => {
      await axios.get("http://localhost:8080/api/create_test/reach_test",{params: {testId: "1"}})
      .then((res) => {
        console.log(res.data)
      })
    }
    data()
  })
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
              {/* <TestNode testNumber="문제1"  partCheck={testList}/>
              <TestNode testNumber="문제2"  partCheck={testList}/>
              <TestNode testNumber="문제3"  partCheck={testList}/>
              <TestNode testNumber="문제4"  partCheck={testList}/>
              <TestNode testNumber="문제5"  partCheck={testList}/>
              <TestNode testNumber="문제6"  partCheck={testList}/>
              <TestNode testNumber="문제7"  partCheck={testList}/>
              <TestNode testNumber="문제8"  partCheck={testList}/>
              <TestNode testNumber="문제9"  partCheck={testList}/> */}
            </div>
          </div>

        </div>

      </div>


    </div>
  )
}
export default Test