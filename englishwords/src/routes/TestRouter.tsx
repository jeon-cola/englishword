import { Routes,Route } from "react-router"
import Test from "../feature/test/Test"
import TestDetail from "../feature/test/TestDetail"

 export interface TestProps {
  isLogin: {
    id: string,
    nickname: string, 
    profile: string
  }
}
// 테스트 라우터 컴포넌트
const TestRouter:React.FC<TestProps> = ({isLogin}) => {
  return(
    <Routes>
      <Route path="/" element={<Test isLogin={isLogin}/>}/>
      <Route path="/detail" element={<TestDetail isLogin={isLogin}/>}/>
    </Routes>
  )
}
export default TestRouter 